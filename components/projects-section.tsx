"use client"

// Removed useState as hoveredProject is not used in this simplified version
// import { useState } from "react" 
import ScrollReveal from "@/components/scroll-reveal"
import { cn } from "@/lib/utils" // cn might still be used by ScrollReveal or if we add classes
import NewProjectCard from "./NewProjectCard" // Import the new card component

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
    title: "E-commerce Platform Integration",
    description: "Seamless integration of a full-featured online store, enhancing user experience with robust cart, checkout, and payment processing capabilities.",
    image: "https://picsum.photos/seed/project1/800/450",
    tags: ["Next.js", "Stripe", "GraphQL", "Tailwind CSS", "Supabase"],
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce",
  },
  {
    id: 2,
    title: "AI-Powered Analytics Dashboard",
    description: "A cutting-edge dashboard providing real-time data visualization and AI-driven insights for complex datasets and business intelligence.",
    image: "https://picsum.photos/seed/project2/800/450",
    tags: ["React", "Python", "FastAPI", "D3.js", "Machine Learning"],
    liveUrl: "https://example.com/analytics-dashboard",
    githubUrl: "https://github.com/example/analytics-dashboard",
  },
  {
    id: 3,
    title: "Mobile Health & Wellness App",
    description: "A cross-platform mobile application focused on promoting user well-being through personalized fitness plans, nutritional tracking, and mindfulness exercises.",
    image: "https://picsum.photos/seed/project3/800/450",
    tags: ["React Native", "Firebase", "TypeScript", "HealthKit", "Google Fit"],
    liveUrl: "https://example.com/wellness-app",
    githubUrl: "https://github.com/example/wellness-app",
  },
  {
    id: 4,
    title: "Cloud Infrastructure Orchestration",
    description: "Development of a scalable and resilient cloud infrastructure using IaC principles, automating deployment and management of microservices.",
    image: "https://picsum.photos/seed/project4/800/450",
    tags: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD"],
    liveUrl: "https://example.com/cloud-orchestration", // Often no live demo for pure infra
    githubUrl: "https://github.com/example/cloud-infra",
  },
  {
    id: 5,
    title: "Interactive Educational Platform",
    description: "An engaging e-learning platform offering interactive courses, progress tracking, and collaborative tools for students and educators.",
    image: "https://picsum.photos/seed/project5/800/450",
    tags: ["Vue.js", "Node.js", "MongoDB", "WebSockets", "Educational Tech"],
    liveUrl: "https://example.com/edu-platform",
    githubUrl: "https://github.com/example/edu-platform",
  },
  {
    id: 6,
    title: "Sustainable Energy Management System",
    description: "A smart system for monitoring and optimizing energy consumption in real-time, contributing to sustainability and cost reduction for users.",
    image: "https://picsum.photos/seed/project6/800/450",
    tags: ["IoT", "Python", "MQTT", "TimescaleDB", "Grafana"],
    liveUrl: "https://example.com/energy-management",
    githubUrl: "https://github.com/example/energy-system",
  },
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
              Discover a selection of my projects, showcasing innovative solutions and technical expertise across various domains.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <ScrollReveal 
              key={project.id} 
              delay={index * 0.1}
              className="h-full" // Ensures ScrollReveal itself takes full height for card
            >
              <NewProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
