"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ScrollReveal from "@/components/scroll-reveal"

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "HTML/CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "NestJS", "Python", "Django", "GraphQL"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma", "Supabase"] },
  { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Vercel", "Netlify", "Git"] },
]

const experiences = [
  {
    period: "2022 - Present",
    role: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    description: "Leading development of enterprise SaaS applications with React, Node.js, and AWS.",
  },
  {
    period: "2020 - 2022",
    role: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    description: "Built and maintained e-commerce platforms and content management systems.",
  },
  {
    period: "2018 - 2020",
    role: "Frontend Developer",
    company: "Creative Web Agency",
    description: "Developed responsive websites and interactive user interfaces for clients.",
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-2 sm:px-4 bg-background relative">
      <div className="container mx-auto">
        {/* Section title - not sticky */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get to know more about my background, skills, and experience as a Full Stack Developer.
            </p>
          </div>
        </ScrollReveal>

        {/* Content area with coordinated sticky elements */}
        <div className="relative">
          {/* Grid layout for content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Image column - takes 5/12 columns on desktop */}
            <div className="lg:col-span-5 order-1">
              <div className="sticky top-20">
                <ScrollReveal>
                  <div className="relative w-full max-w-md mx-auto">
                    <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 to-purple-700/30 rounded-lg blur-2xl animate-pulse"></div>
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-purple-500/20 transition-all duration-500 hover:border-purple-500/40 hover:shadow-lg">
                      <Image
                        src="/images/profile-alt.png"
                        alt="Developer Portrait"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Content column - takes 7/12 columns on desktop */}
            <div className="lg:col-span-7 order-2">
              <ScrollReveal>
                <h3 className="text-2xl font-bold mb-4">My Journey</h3>
                <p className="text-muted-foreground mb-6">
                  I'm Mirza Akeel, a passionate Full Stack Developer with over 5 years of experience building web
                  applications. I specialize in creating elegant, efficient, and user-friendly solutions that solve
                  real-world problems.
                </p>
                <p className="text-muted-foreground mb-6">
                  My approach combines technical expertise with creative problem-solving. I'm constantly learning and
                  exploring new technologies to stay at the forefront of web development.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <h3 className="text-2xl font-bold mt-8 mb-4">Skills & Technologies</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {skills.map((skillGroup, index) => (
                    <Card
                      key={index}
                      className="bg-background/50 border-background-foreground/10 transition-all duration-300 hover:border-purple-500/20 hover:bg-background/70 hover-lift"
                    >
                      <CardContent className="pt-6 px-3 sm:px-6">
                        <h4 className="font-semibold mb-3 text-purple-500">{skillGroup.category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs sm:text-sm transition-all duration-300 hover:bg-purple-500/10 hover:border-purple-500/30"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <h3 className="text-2xl font-bold mt-8 mb-4">Experience</h3>
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="relative pl-6 pb-6 border-l border-purple-500/30 transition-all duration-300 hover:border-l-purple-500"
                    >
                      <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[6.5px] top-1.5 transition-all duration-300 hover:scale-125 hover:bg-purple-400"></div>
                      <p className="text-sm text-purple-500">{exp.period}</p>
                      <h4 className="font-bold">{exp.role}</h4>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Add extra padding at the bottom to ensure enough scrollable content */}
              <div className="h-16"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
