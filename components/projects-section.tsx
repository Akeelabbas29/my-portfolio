"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

// Updated project data with Unsplash stock images
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart, checkout, and payment processing.",
    image: "/images/ecommerce-project.png",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task manager with real-time updates and team features.",
    image: "/images/task-management.png",
    tags: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "An AI-powered application that generates marketing content based on prompts.",
    image: "/images/ai-generator.png",
    tags: ["React", "Python", "Flask", "OpenAI"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 4,
    title: "Finance Dashboard",
    description: "A comprehensive dashboard for tracking personal finances and investments.",
    image: "/images/finance-dashboard.png",
    tags: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
]

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20 px-2 sm:px-4 bg-background/50">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and expertise in full-stack development.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index % 2 === 0 ? 1 : 2}>
              <Card
                className="overflow-hidden h-full border-background-foreground/10 bg-background/80 backdrop-blur-sm transition-all duration-500 hover-lift"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredProject === project.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>
                <CardHeader className="px-3 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs sm:text-sm transition-all duration-300 hover:bg-purple-500/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between px-3 sm:px-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-xs sm:text-sm transition-all duration-300 hover:border-purple-500 hover:text-purple-500"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2 bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm transition-all duration-300 hover:shadow-lg"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
