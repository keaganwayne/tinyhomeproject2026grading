/* Local portfolio simulator. No network transport or real authentication. */
(() => {
  'use strict';
  const key = `portfolio-demo-v1:${window.DEMO_PROJECT}`;
  const copy = value => structuredClone(value);
  let db;
  try { db = JSON.parse(sessionStorage.getItem(key)); } catch {}
  db ||= copy(window.DEMO_DATA || {});
  const save = () => sessionStorage.setItem(key, JSON.stringify(db));
  const user = { id: 'demo-user', email: 'teacher@example.invalid', user_metadata: { username: 'Demo Explorer' } };
  const session = { user, access_token: 'local-demo-session-not-a-credential' };
  const listeners = new Set();
  class Query {
    constructor(table) { this.table = table; this.filters = []; this.sorts = []; this.operation = 'select'; }
    select() { return this; }
    eq(k,v) { this.filters.push(row => String(row[k]) === String(v)); return this; }
    neq(k,v) { this.filters.push(row => String(row[k]) !== String(v)); return this; }
    in(k,values) { this.filters.push(row => values.some(v => String(v) === String(row[k]))); return this; }
    is(k,v) { this.filters.push(row => (row[k] ?? null) === v); return this; }
    lt(k,v) { this.filters.push(row => row[k] < v); return this; }
    lte(k,v) { this.filters.push(row => row[k] <= v); return this; }
    gt(k,v) { this.filters.push(row => row[k] > v); return this; }
    gte(k,v) { this.filters.push(row => row[k] >= v); return this; }
    or(expression) { const clauses = expression.split(','); this.filters.push(row => clauses.some(c => { const [k,op,...v] = c.split('.'); return op === 'eq' && String(row[k]) === v.join('.'); })); return this; }
    order(k,opts={}) { this.sorts.push([k,opts.ascending !== false]); return this; }
    limit(n) { this.max = n; return this; }
    single() { this.one = true; return this; }
    maybeSingle() { this.one = true; return this; }
    insert(rows) { this.operation = 'insert'; this.values = Array.isArray(rows) ? rows : [rows]; return this; }
    upsert(rows,opts={}) { this.insert(rows); this.operation = 'upsert'; this.conflict = opts.onConflict; return this; }
    update(patch) { this.operation = 'update'; this.patch = patch; return this; }
    delete() { this.operation = 'delete'; return this; }
    then(resolve,reject) { return Promise.resolve().then(() => this.execute()).then(resolve,reject); }
    execute() {
      const table = db[this.table] ||= [];
      let rows = table.filter(row => this.filters.every(f => f(row)));
      if (['insert','upsert'].includes(this.operation)) {
        rows = this.values.map(value => {
          const keys = (this.conflict || (this.table === 'active_decks' ? 'user_id' : 'id')).split(',');
          const existing = this.operation === 'upsert' && table.find(row => keys.every(k => value[k] !== undefined && String(row[k]) === String(value[k])));
          if (existing) { Object.assign(existing,copy(value)); return existing; }
          const row = { id: Math.max(0,...table.map(r => Number(r.id)||0))+1, created_at: new Date().toISOString(), ...copy(value) };
          table.push(row); return row;
        });
      } else if (this.operation === 'update') rows.forEach(row => Object.assign(row,copy(this.patch)));
      else if (this.operation === 'delete') db[this.table] = table.filter(row => !rows.includes(row));
      if (this.operation !== 'select') save();
      rows = [...rows].sort((a,b) => { for (const [k,asc] of this.sorts) { const d = typeof a[k] === 'number' ? a[k]-b[k] : String(a[k]??'').localeCompare(String(b[k]??'')); if (d) return asc ? d : -d; } return 0; });
      if (this.max !== undefined) rows = rows.slice(0,this.max);
      return { data:copy(this.one ? rows[0] || null : rows), error:null, count:rows.length };
    }
  }
  const auth = {
    async getSession() { return { data:{session}, error:null }; },
    async getUser() { return { data:{user}, error:null }; },
    async signInWithPassword() { listeners.forEach(fn => fn('SIGNED_IN',session)); return { data:{session,user},error:null }; },
    async signUp() { return {data:{user},error:null}; },
    async signOut() { listeners.forEach(fn => fn('SIGNED_OUT',null)); return {error:null}; },
    async resetPasswordForEmail() { return {error:{message:'This demo has no accounts or email delivery.'}}; },
    onAuthStateChange(fn) { listeners.add(fn); return {data:{subscription:{unsubscribe:()=>listeners.delete(fn)}}}; }
  };
  const client = {
    from: name => new Query(name), auth,
    async rpc(name) { return {data:null,error:{message:`${name}: shared multiplayer is disabled in this local demo.`}}; },
    channel() { const ch={on:()=>ch,subscribe:()=>ch,unsubscribe:()=>{}}; return ch; },
    removeChannel() {}, removeAllChannels() {}
  };
  window.DemoDatabase = { createClient:()=>client };
  window.demoFetch = async (input,opts={}) => {
    const url = new URL(String(input),'https://demo.invalid');
    if (url.hostname !== 'demo.invalid') throw new Error('Demo requests cannot contact external services.');
    if (opts.method === 'HEAD') return new Response(null,{status:404});
    const path = url.pathname.replace(/^\/rest\/v1\//,'');
    let payload;
    if (path === 'rpc/thp_apply_vote') {
      const body=JSON.parse(opts.body||'{}');
      const voter=(db.thp_vote_sessions||[]).find(v=>String(v.id)===String(body.p_session_id));
      if (!voter) return new Response(JSON.stringify({error:'Start a demo voting session first.'}),{status:400});
      voter.votes_used=(voter.votes_used||0)+1; voter.completed=voter.votes_used>=voter.max_votes;
      for (const row of db.thp_group_profiles||[]) {
        const prefix=body.p_voter_type==='student'?'student':'teacher';
        if ([body.p_left_groupid,body.p_right_groupid].includes(row.groupid)) {
          row[prefix+'_elo'] += row.groupid===body.p_chosen_groupid ? 12 : -12;
          row[prefix+'_votes_count']++;
        }
      }
      save(); payload={...voter};
    } else {
      const q=client.from(path);
      for (const [k,v] of url.searchParams) {
        if (v.startsWith('eq.')) q.eq(k,v.slice(3));
        else if(k==='limit') q.limit(Number(v));
        else if(k==='order') { const [field,direction]=v.split('.'); q.order(field,{ascending:direction!=='desc'}); }
      }
      if (opts.method==='POST') q.insert(JSON.parse(opts.body||'{}'));
      payload=(await q).data;
    }
    return new Response(JSON.stringify(payload),{status:200,headers:{'Content-Type':'application/json'}});
  };
})();
