export interface Project {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    description: string[];
    tech: string[];
}

export interface SkillGroup {
    title: string;
    items: string[];
}

export interface Award {
    title: string;
    org: string;
    year: string;
}

export const projects: Project[] = [
    {
        id: "01",
        title: "UntitledOS",
        subtitle: "Encrypted Operating System",
        category: "Systems Engineering",
        year: "2026",
        description: [
            "Architected a non-Linux encrypted OS from scratch, prioritizing speed, privacy, and system-level encryption.",
            "Features a native GUI, real-time monitoring, and a modular architecture.",
            "Targeting power users, researchers, and cyber-operatives with minimal footprint.",
        ],
        tech: ["C", "Assembly", "GRUB", "Bootloader", "Encryption"],
    },
    {
        id: "02",
        title: "Nexus N1",
        subtitle: "Smart Automation Prototype",
        category: "IoT & Embedded",
        year: "2025",
        description: [
            "Modular home automation and security system with low-cost microcontrollers (ESP8266, Arduino Mega).",
            "RFID + app-based access, motion detection, ISD1820 voice alerts, servo door lock, gas detection with auto cut-off.",
            "Live demonstration at FabFest 2025.",
        ],
        tech: ["Arduino", "ESP8266", "RFID", "Sensors", "IoT"],
    },
    {
        id: "03",
        title: "Valkyrie Arm Mk I",
        subtitle: "3D Printed Smart Robotic Arm",
        category: "Robotics",
        year: "2025",
        description: [
            "6-axis, fully 3D-printed robotic arm with modular construction and joystick control.",
            "Reimagined from the Thor Arm — custom mechanics and enclosure, built in under a week.",
            "AI expansion via Python GUI, OpenCV, and MediaPipe for advanced gesture control.",
        ],
        tech: ["3D Printing", "Marlin", "Python", "OpenCV", "MediaPipe"],
    },
    {
        id: "04",
        title: "Predictive Maintenance AI",
        subtitle: "IEEE Hackathon Project",
        category: "AI / ML",
        year: "2024",
        description: [
            "AI-driven system forecasting machine wear 24–48 hours before failure.",
            "Built during a 24-hour IEEE hackathon using the NASA Bearing Dataset.",
            "Real-time sensor ingestion via MQTT for industrial machinery monitoring.",
        ],
        tech: ["Python", "scikit-learn", "MQTT", "NASA Dataset", "Signal Processing"],
    },
    {
        id: "05",
        title: "ZeroVault",
        subtitle: "Encrypted Notes Manager",
        category: "Security",
        year: "2025",
        description: [
            "Python-based, Fernet-encrypted note system with local storage and Tkinter UI.",
            "AES protection with a smooth cross-platform user experience.",
        ],
        tech: ["Python", "Fernet", "AES", "Tkinter", "Cryptography"],
    },
];

export const miniProjects = [
    { title: "Social Media Scheduler", tech: "Django + AI", desc: "Engagement optimizer with Twitter/Instagram APIs and scikit-learn." },
    { title: "IoT Dashboard", tech: "Django + ESP8266", desc: "Real-time sensor monitoring and relay control web interface." },
    { title: "LLM Chatbot Control Panel", tech: "GPT + Hardware", desc: "GPT-based commands triggering hardware operations." },
    { title: "Full-stack Note Vault", tech: "Django + Fernet", desc: "Web UI with Django backend and client-side encryption." },
];

export const skillGroups: SkillGroup[] = [
    { title: "Programming", items: ["Python", "C", "C++", "Django", "HTML/CSS/JS", "REST APIs", "Assembly", "Firebase", "Git"] },
    { title: "Hardware & Embedded", items: ["Arduino", "ESP8266", "Microcontrollers", "Relay Modules", "Sensors", "Servo/Motor Control"] },
    { title: "AI / ML / CV", items: ["OpenCV", "MediaPipe", "LLMs", "Chatbot Dev", "Gesture Recognition", "scikit-learn"] },
    { title: "Design & Mfg", items: ["3D Printing", "Circuit Design", "Marlin Firmware", "Mobile Robotics", "CAD Modeling"] },
    { title: "Security", items: ["AES", "Fernet", "OS Development", "Bootloader Design", "Surveillance Resistance"] },
    { title: "Web & UI/UX", items: ["Full-stack Dev", "UI/UX Prototyping", "APK Conversion", "Django", "Next.js"] },
];

export const awards: Award[] = [
    { title: "Winner — AI Quiz", org: "College of Applied Sciences, Dhanuvachapuram", year: "2026" },
    { title: "2nd Runner-Up — Ideafest", org: "JAIN University Kochi", year: "2026" },
    { title: "Summit of the Future 2026", org: "Qualified & Attended", year: "2026" },
    { title: "AITEDUCONF 2026", org: "Attended", year: "2026" },
    { title: "First Prize — Robotics Competition", org: "ACE College of Engineering", year: "2024" },
    { title: "Finalist — School Innovation Marathon", org: "Ministry of Education, Govt. of India", year: "2024" },
    { title: "Participant — ACE Hackathon", org: "ACE College of Engineering", year: "2024" },
    { title: "Little KITES State Camp", org: "Govt. of Kerala", year: "2023" },
    { title: "Finalist — Young Innovators Program", org: "K-DISC, Govt. of Kerala", year: "2022" },
];

export const bio = [
    "17-year-old tech innovator from Kerala, India, specializing in robotics, operating systems, and AI-driven embedded systems.",
    "Experienced in building predictive maintenance AI, custom operating systems, and computer vision-based automation solutions. Winner and finalist at multiple hackathons and academic events, including IEEE hackathons, Ideafest (JAIN University), and AITEDUCONF 2026.",
    "Currently developing UntitledOS — a performance-driven, security-centric operating system architected from scratch.",
];

export const traits = [
    "Tech Innovator",
    "Systems Developer",
    "Co-Founder",
    "Robotics Engineer",
    "OS Architect",
    "AI Researcher",
];
