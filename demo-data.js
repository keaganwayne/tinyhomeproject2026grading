window.DEMO_PROJECT = "tinyhomeproject2026grading";
window.DEMO_MESSAGE = "Portfolio demo \u00b7 Fictional data \u00b7 Changes stay in this tab; no school database is connected. Enter demo to explore the grading dashboard.";
window.DEMO_DATA = {
  "settings": [
    {
      "Key": "ADMIN_CODE",
      "Value": "demo"
    },
    {
      "Key": "CURRENT_DAYNO",
      "Value": 1
    },
    {
      "Key": "MIN_ROLE_POINTS",
      "Value": 4
    },
    {
      "Key": "MAX_ROLE_POINTS",
      "Value": 12
    },
    {
      "Key": "MAX_ROLES_PER_STUDENT",
      "Value": 4
    }
  ],
  "students": [
    {
      "StudentID": 1,
      "Name": "Demo Learner 01",
      "Class": "Demo A",
      "GroupID": 1,
      "Active": true,
      "LoginCode": 1001
    },
    {
      "StudentID": 2,
      "Name": "Demo Learner 02",
      "Class": "Demo A",
      "GroupID": 1,
      "Active": true,
      "LoginCode": 1002
    },
    {
      "StudentID": 3,
      "Name": "Demo Learner 03",
      "Class": "Demo A",
      "GroupID": 1,
      "Active": true,
      "LoginCode": 1003
    },
    {
      "StudentID": 4,
      "Name": "Demo Learner 04",
      "Class": "Demo A",
      "GroupID": 2,
      "Active": true,
      "LoginCode": 1004
    },
    {
      "StudentID": 5,
      "Name": "Demo Learner 05",
      "Class": "Demo A",
      "GroupID": 2,
      "Active": true,
      "LoginCode": 1005
    },
    {
      "StudentID": 6,
      "Name": "Demo Learner 06",
      "Class": "Demo A",
      "GroupID": 2,
      "Active": true,
      "LoginCode": 1006
    }
  ],
  "groups": [
    {
      "GroupID": 1,
      "GroupName": "Demo Penguin",
      "Class": "Demo A"
    },
    {
      "GroupID": 2,
      "GroupName": "Demo Bear",
      "Class": "Demo A"
    }
  ],
  "calendar": [
    {
      "DayNo": 1,
      "Stage": 1,
      "Label": "Demo day 1",
      "Date": "2026-11-01"
    },
    {
      "DayNo": 2,
      "Stage": 1,
      "Label": "Demo day 2",
      "Date": "2026-11-02"
    },
    {
      "DayNo": 3,
      "Stage": 2,
      "Label": "Demo day 3",
      "Date": "2026-11-03"
    },
    {
      "DayNo": 4,
      "Stage": 2,
      "Label": "Demo day 4",
      "Date": "2026-11-04"
    }
  ],
  "items": [
    {
      "ItemID": "R1",
      "Kind": "ROLE",
      "Title": "Designer",
      "Tooltip": "Fictional project role for this demonstration.",
      "Points": 4,
      "Stage": "ALL",
      "Active": true,
      "Order": 0,
      "SingleOwner": false
    },
    {
      "ItemID": "R2",
      "Kind": "ROLE",
      "Title": "Builder",
      "Tooltip": "Fictional project role for this demonstration.",
      "Points": 4,
      "Stage": "ALL",
      "Active": true,
      "Order": 1,
      "SingleOwner": false
    },
    {
      "ItemID": "R3",
      "Kind": "ROLE",
      "Title": "Researcher",
      "Tooltip": "Fictional project role for this demonstration.",
      "Points": 4,
      "Stage": "ALL",
      "Active": true,
      "Order": 2,
      "SingleOwner": false
    },
    {
      "ItemID": "T1",
      "Kind": "TASK",
      "Title": "Sketch a tiny home",
      "Tooltip": "Create a simple floor plan.",
      "Points": 4,
      "Stage": "ALL",
      "Active": true,
      "Order": 4
    }
  ],
  "dailyassignments": [
    {
      "id": 1,
      "DayNo": 1,
      "StudentID": 1,
      "RoleID": "R1"
    },
    {
      "id": 2,
      "DayNo": 1,
      "StudentID": 2,
      "RoleID": "R2"
    },
    {
      "id": 3,
      "DayNo": 1,
      "StudentID": 3,
      "RoleID": "R3"
    },
    {
      "id": 4,
      "DayNo": 1,
      "StudentID": 4,
      "RoleID": "R1"
    },
    {
      "id": 5,
      "DayNo": 1,
      "StudentID": 5,
      "RoleID": "R2"
    },
    {
      "id": 6,
      "DayNo": 1,
      "StudentID": 6,
      "RoleID": "R3"
    }
  ],
  "rolechecks": [
    {
      "id": 1,
      "DayNo": 1,
      "StudentID": 1,
      "RoleID": "R1",
      "Done": true,
      "Note": "Synthetic example note."
    },
    {
      "id": 2,
      "DayNo": 1,
      "StudentID": 2,
      "RoleID": "R2",
      "Done": false,
      "Note": "Synthetic example note."
    },
    {
      "id": 3,
      "DayNo": 1,
      "StudentID": 3,
      "RoleID": "R3",
      "Done": true,
      "Note": "Synthetic example note."
    },
    {
      "id": 4,
      "DayNo": 1,
      "StudentID": 4,
      "RoleID": "R1",
      "Done": false,
      "Note": "Synthetic example note."
    },
    {
      "id": 5,
      "DayNo": 1,
      "StudentID": 5,
      "RoleID": "R2",
      "Done": true,
      "Note": "Synthetic example note."
    },
    {
      "id": 6,
      "DayNo": 1,
      "StudentID": 6,
      "RoleID": "R3",
      "Done": false,
      "Note": "Synthetic example note."
    }
  ],
  "taskstatus": [
    {
      "GroupID": 1,
      "TaskID": "T1",
      "Status": "DOING",
      "Note": "Demo floor plan in progress."
    }
  ],
  "project_group_roles": [
    {
      "groupid": 1,
      "rolekey": "designer",
      "studentnames": "Demo Learner 01"
    }
  ],
  "project_group_ruleflags": [],
  "project_group_padlets": [],
  "project_student_reviews": [],
  "project_group_reviews": [],
  "daily_role_gate": []
};
