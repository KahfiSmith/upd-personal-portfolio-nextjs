import type { WorkExperienceItemProps } from "@/types";

export const dataWorkExperience: WorkExperienceItemProps[] = [
  {
    id: 1,
    title: "Rental Items Platform",
    role: "Frontend Developer (Internship)",
    period: "Aug 2024 - Oct 2024",
     company: "Itematik Pramitha Nusantara",
    description: [
      "Responsible as a programmer in developing a goods rental website using React.js with TypeScript, Tailwind CSS, and Redux for state management.",
      "Analyze business needs to provide effective features to make it easier for users to digitally borrow goods.",
      "Manage inventory data and item rental transactions with PostgreSQL to ensure fast and efficient data storage and access.",
    ],
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Material UI", "Redux", "PostgreSQL", "Firebase"],
  },
  {
    id: 2,
    title: "Online Psychology Consultation",
    role: "Fullstack Web Developer (Independent Study)",
    period: "Feb 2024 - Jun 2024",
    company: "Infinite Learning",
    description: [
      "Responsible as the main programmer in developing an online psychology consultation platform that integrates React.js for the frontend and Express.js for the backend",
      "Conduct market research to ensure that the website meets user needs in the health sector.",
      "Analyze business needs to create effective digital solutions in providing health information.",
    ],
    tags: ["React.js", "Express.js", "JavaScript", "Tailwind CSS", "MySQL"],
  },
  {
    id: 3,
    title: "Learning App Management Dashboard",
    role: "Fullstack Web Developer (Remote)",
    period: "Nov 2023 - Oct 2024",
    company: "Studyo",
    description: [
      "Responsible as the programmer in developing a learning content management website using Laravel and Bootstrap, ensuring seamless user experience and responsive design.",
      "Integrate Firebase Firestore, Authentication, and Cloud Storage into the website.",
      "Work collaboratively within development teams to produce innovative and responsive web solutions.",
    ],
    tags: ["Laravel", "Bootstrap", "Alpine.js", "gRPC", "Firebase"],
  },
];
