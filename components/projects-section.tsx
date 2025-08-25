"use client";

// Removed useState as hoveredProject is not used in this simplified version
// import { useState } from "react"
import ScrollReveal from "@/components/scroll-reveal";
import { cn } from "@/lib/utils"; // cn might still be used by ScrollReveal or if we add classes
import NewProjectCard from "./NewProjectCard"; // Import the new card component

// No longer need specific Card parts or next/image directly here
// import Image from "next/image"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button" // Handled by NewProjectCard
// import { Badge } from "@/components/ui/badge" // Handled by NewProjectCard
// import { ExternalLink, Github } from "lucide-react" // Handled by NewProjectCard

// Define TypeScript interface for a project (simplified, layout is removed)
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string; // Made optional as per NewProjectCard
  githubUrl?: string; // Made optional as per NewProjectCard
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Social Media Platform",
    description:
      "Built RESTful API backend using Node.js, TypeScript, and Express.js for social media platform. Implemented JWT authentication, middleware authorization, and rate limiting for security. Designed MongoDB database with user profiles, posts, comments, and file upload functionality. Created comprehensive error handling, validation, and API documentation following REST principles.",
    image: "https://picsum.photos/seed/social-media/800/450",
    tags: ["Node.js", "TypeScript", "Express.js", "MongoDB", "JWT", "REST API"],
    // liveUrl: "https://example.com/social-media",
    githubUrl: "https://github.com/example/social-media",
  },
  {
    id: 2,
    title: "Sign Language Recognition with Video Chat",
    description:
      "Engineered a cutting-edge web-based application using WebRTC and socket.io enabling real-time sign language recognition during video calls. Developed using Python, Django, and React, the app features a sophisticated object detection model trained to accurately recognize signs from video frames. Designed for accessibility, the app aims to bridge communication barriers for individuals using sign language.",
    image: "https://picsum.photos/seed/sign-language/800/450",
    tags: [
      "Python",
      "Django",
      "React",
      "WebRTC",
      "Socket.io",
      "Machine Learning",
    ],
    // liveUrl: "https://example.com/sign-language-app",
    githubUrl: "https://github.com/Akeelabbas29/signLanguageVideoChat",
  },
  // {
  //   id: 3,
  //   title: "AI-Powered Analytics Dashboard",
  //   description:
  //     "A cutting-edge dashboard providing real-time data visualization and AI-driven insights for complex datasets and business intelligence.",
  //   image: "https://picsum.photos/seed/project2/800/450",
  //   tags: ["React", "Python", "FastAPI", "D3.js", "Machine Learning"],
  //   liveUrl: "https://example.com/analytics-dashboard",
  //   githubUrl: "https://github.com/example/analytics-dashboard",
  // },
  // {
  //   id: 4,
  //   title: "Cloud Infrastructure Orchestration",
  //   description:
  //     "Development of a scalable and resilient cloud infrastructure using IaC principles, automating deployment and management of microservices.",
  //   image: "https://picsum.photos/seed/project4/800/450",
  //   tags: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD"],
  //   liveUrl: "https://example.com/cloud-orchestration", // Often no live demo for pure infra
  //   githubUrl: "https://github.com/example/cloud-infra",
  // },
  // {
  //   id: 5,
  //   title: "Interactive Educational Platform",
  //   description:
  //     "An engaging e-learning platform offering interactive courses, progress tracking, and collaborative tools for students and educators.",
  //   image: "https://picsum.photos/seed/project5/800/450",
  //   tags: ["Vue.js", "Node.js", "MongoDB", "WebSockets", "Educational Tech"],
  //   liveUrl: "https://example.com/edu-platform",
  //   githubUrl: "https://github.com/example/edu-platform",
  // },
  // {
  //   id: 6,
  //   title: "Sustainable Energy Management System",
  //   description:
  //     "A smart system for monitoring and optimizing energy consumption in real-time, contributing to sustainability and cost reduction for users.",
  //   image: "https://picsum.photos/seed/project6/800/450",
  //   tags: ["IoT", "Python", "MQTT", "TimescaleDB", "Grafana"],
  //   liveUrl: "https://example.com/energy-management",
  //   githubUrl: "https://github.com/example/energy-system",
  // },
];

export default function ProjectsSection() {
  // const [hoveredProject, setHoveredProject] = useState<number | null>(null) // No longer needed for this card style

  return (
    <section id="projects" className="py-20 px-2 sm:px-4 bg-background/50">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover a selection of my projects, showcasing innovative
              solutions and technical expertise across various domains.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index === 0 ? undefined : index === 1 ? 1 : 2}
              className="h-full" // Ensures ScrollReveal itself takes full height for card
            >
              <NewProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
