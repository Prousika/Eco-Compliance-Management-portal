export const reports = [
  {
    reportNumber: "RPT-89011",
    date: "2025-03-19",
    type: "Water Leakage",
    status: "In Progress",
    progress: 75,
    tone: "warning",
    location: "Block B - 3rd Floor",
    assignedWorker: "Senthil Kumar",
    description:
      "Water leakage in the bathroom area of Block B - 3rd Floor. Significant water seepage observed near the main pipe, causing wet and slippery floors.",
    timeline: [
      { date: "2025-03-19", text: "Assigned to Senthil Kumar" },
      { date: "2025-03-21", text: "Repair work in progress" },
    ],
    images: [
      { src: "/compliantsolved.jpg", name: "water-leak-1.jpg" },
      { src: "/compliant-raised.png", name: "water-leak-2.jpg" },
      { src: "/backgroundimg.jpg", name: "water-leak-3.jpg" },
    ],
  },
  {
    reportNumber: "RPT-78045",
    date: "2024-12-10",
    type: "Plastic Waste",
    status: "Pending",
    progress: 0,
    tone: "pending",
    location: "Playground Area",
    assignedWorker: "Team Allocation Pending",
    description:
      "Plastic waste has accumulated near the play ground. Area needs immediate cleanup and segregation.",
    timeline: [
      { date: "2024-12-10", text: "Report created and queued" },
      { date: "2024-12-11", text: "Awaiting sanitation team assignment" },
    ],
    images: [
      { src: "/compliant-raised.png", name: "plastic-waste-1.jpg" },
      { src: "/garbage overflow.jpg", name: "plastic-waste-2.jpg" },
      { src: "/active users.jpg", name: "plastic-waste-3.jpg" },
    ],
  },
  {
    reportNumber: "RPT-66320",
    date: "2024-09-27",
    type: "Garbage Overflow",
    status: "Resolved",
    progress: 100,
    tone: "success",
    location: "Ib Block - Front",
    assignedWorker: "Cleanup Unit",
    description:
      "Garbage overflow issue at the junction has been cleared. Final area wash and disinfection completed, and bins were replaced.",
    timeline: [
      { date: "2024-09-27", text: "Assigned to cleanup unit" },
      { date: "2024-09-28", text: "Overflow removed and sanitized" },
    ],
    images: [
      { src: "/garbage overflow.jpg", name: "garbage-overflow-1.jpg" },
      { src: "/compliantsolved.jpg", name: "garbage-overflow-2.jpg" },
      { src: "/broken street light.jpg", name: "garbage-overflow-3.jpg" },
    ],
  },
  {
    reportNumber: "RPT-90214",
    date: "2025-01-14",
    type: "Broken Street Light",
    status: "In Progress",
    progress: 40,
    tone: "warning",
    location: "Campus Pathway - Block C",
    assignedWorker: "Electrical Maintenance Team",
    description:
      "Street light near Block C pathway is not working during evening hours, causing poor visibility and safety concerns for students.",
    timeline: [
      { date: "2025-01-14", text: "Issue logged by student representative" },
      { date: "2025-01-15", text: "Inspection completed; replacement scheduled" },
    ],
    images: [
      { src: "/broken street light.jpg", name: "street-light-1.jpg" },
      { src: "/backgroundimg.jpg", name: "street-light-2.jpg" },
      { src: "/compliant-raised.png", name: "street-light-3.jpg" },
    ],
  },
  {
    reportNumber: "RPT-91507",
    date: "2025-02-03",
    type: "Classroom Bench Damage",
    status: "Pending",
    progress: 10,
    tone: "pending",
    location: "Academic Block A - Room 204",
    assignedWorker: "Carpentry Team Allocation Pending",
    description:
      "Multiple benches in Room 204 are damaged with loose supports and broken planks, affecting student seating during lectures.",
    timeline: [
      { date: "2025-02-03", text: "Complaint submitted by faculty coordinator" },
      { date: "2025-02-04", text: "Waiting for workshop material approval" },
    ],
    images: [
      { src: "/active users.jpg", name: "bench-damage-1.jpg" },
      { src: "/compliant-raised.png", name: "bench-damage-2.jpg" },
      { src: "/backgroundimg.jpg", name: "bench-damage-3.jpg" },
    ],
  },
];
