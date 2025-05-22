"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

// Define TypeScript interface for project layout
interface ProjectLayout {
  sm?: { colSpan?: number; rowSpan?: number };
  md?: { colSpan?: number; rowSpan?: number };
  lg?: { colSpan?: number; rowSpan?: number };
}

// Define TypeScript interface for a project
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  layout?: ProjectLayout; // Optional layout property
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform (Hero)",
    description: "A full-featured online store with cart, checkout, and payment processing, showcased prominently.",
    image: "/images/ecommerce-project.png", // Ensure this image is suitable for a large hero display
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    layout: {
      lg: { colSpan: 2, rowSpan: 2 },
      md: { colSpan: 2, rowSpan: 1 }, // On medium, it takes full width if grid is 2 cols
    },
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task manager with real-time updates and team features.",
    image: "/images/task-management.png",
    tags: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    layout: { // Default 1x1 for all sizes unless specified
      lg: { colSpan: 1, rowSpan: 1 },
      md: { colSpan: 1, rowSpan: 1 },
    }
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "An AI-powered application that generates marketing content based on prompts.",
    image: "/images/ai-generator.png",
    tags: ["React", "Python", "Flask", "OpenAI"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    layout: {
      lg: { colSpan: 1, rowSpan: 1 },
      md: { colSpan: 1, rowSpan: 1 },
    }
  },
  {
    id: 4,
    title: "Finance Dashboard",
    description: "A comprehensive dashboard for tracking personal finances and investments.",
    image: "/images/finance-dashboard.png",
    tags: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    layout: {
      lg: { colSpan: 1, rowSpan: 1 },
      md: { colSpan: 1, rowSpan: 1 },
    }
  },
  {
    id: 5,
    title: "Portfolio Website V2",
    description: "Redesign of a personal portfolio with modern UI/UX and animations.",
    image: "/images/placeholder-project-1.png", // Placeholder image
    tags: ["Next.js", "Framer Motion", "Three.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    layout: {
      lg: { colSpan: 1, rowSpan: 1 },
      md: { colSpan: 1, rowSpan: 1 },
    }
  },
  {
    id: 6,
    title: "Social Media Analytics",
    description: "Dashboard for tracking social media engagement and growth metrics.",
    image: "/images/placeholder-project-2.png", // Placeholder image
    tags: ["React", "Chart.js", "Node.js", "API Integration"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    layout: {
      lg: { colSpan: 1, rowSpan: 1 },
      md: { colSpan: 1, rowSpan: 1 }, // This will make the md grid have 3 items in the last row if P1 is md:col-span-2
                                     // If P1 is md:col-span-2, row-span-1, then 5 items remain.
                                     // md:grid-cols-2 means 2 items per row.
                                     // Row 1: P1 (2 cols)
                                     // Row 2: P2, P3
                                     // Row 3: P4, P5
                                     // Row 4: P6 (1 col) - this is fine.
    }
  },
];

// Helper function to generate responsive grid classes
const getGridSpanClasses = (layout?: ProjectLayout): string => {
  if (!layout) return "col-span-1 row-span-1"; // Default for sm and if no layout specified

  const classes: string[] = [];

  // Small screens (default to col-span-1, row-span-1 if not specified)
  classes.push(layout.sm?.colSpan ? `col-span-${layout.sm.colSpan}` : "col-span-1");
  classes.push(layout.sm?.rowSpan ? `row-span-${layout.sm.rowSpan}` : "row-span-1");

  // Medium screens
  classes.push(layout.md?.colSpan ? `md:col-span-${layout.md.colSpan}` : "md:col-span-1");
  classes.push(layout.md?.rowSpan ? `md:row-span-${layout.md.rowSpan}` : "md:row-span-1");
  
  // Large screens
  classes.push(layout.lg?.colSpan ? `lg:col-span-${layout.lg.colSpan}` : "lg:col-span-1");
  classes.push(layout.lg?.rowSpan ? `lg:row-span-${layout.lg.rowSpan}` : "lg:row-span-1");

  return classes.join(" ");
};


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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 auto-rows-fr">
          {projects.map((project, index) => (
            <ScrollReveal 
              key={project.id} 
              delay={index * 0.1} // Stagger animation slightly
              className={cn(
                "h-full", // Ensure ScrollReveal takes full height of grid cell
                getGridSpanClasses(project.layout)
              )}
            >
              <Card
                className="overflow-hidden h-full flex flex-col border-background-foreground/10 bg-background/80 backdrop-blur-sm transition-all duration-500 hover-lift"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={cn(
                  "relative w-full overflow-hidden",
                  // Adjust height for hero item vs standard items
                  project.layout?.lg?.rowSpan === 2 ? "aspect-[16/10] sm:aspect-video" : "aspect-video sm:h-56" 
                )}>
                  <Image
                    src={project.image || "/images/placeholder.svg"} // Use placeholder.svg if specific ones are missing
                    alt={project.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700",
                      hoveredProject === project.id ? "scale-110" : "scale-100",
                      project.layout?.lg?.rowSpan === 2 ? "object-center" : "object-center" // Ensure hero image is centered
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <CardHeader className="px-3 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm mt-1 line-clamp-3">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-3 sm:px-6 flex-grow"> {/* flex-grow to push footer down */}
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
                <CardFooter className="flex justify-between items-center px-3 sm:px-6 pb-4 sm:pb-6">
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
