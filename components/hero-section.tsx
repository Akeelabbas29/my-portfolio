"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";
import Link from "next/link";
import ThreeCanvas from '@/components/ThreeCanvas';

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Simpler image loading approach
  useEffect(() => {
    // Set a timeout to simulate image loading instead of using the Image API
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Simple scroll functions without any parameters
  function handleScrollToProjects() {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleScrollToContact() {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6"
    >
      <ThreeCanvas />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal>
              <h2 className="text-2xl font-medium text-purple-500 mb-2">
                Hello there, I'm
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Mirza Akeel
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <h3 className="text-xl md:text-2xl text-muted-foreground mb-6">
                A Full Stack Developer who builds sleek and scalable web apps
              </h3>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                I specialize in creating beautiful, high-performance
                applications with modern technologies and best practices.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  onClick={handleScrollToProjects}
                >
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  onClick={handleScrollToContact}
                >
                  Contact Me
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={3}>
              <div className="flex space-x-4">
                <Link
                  href="https://www.linkedin.com/in/akeelabbas/"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="LinkedIn"
                    className="transition-transform duration-300 hover:text-purple-500 hover:scale-110"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/akeelabbas29"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="GitHub"
                    className="transition-transform duration-300 hover:text-purple-500 hover:scale-110"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="https://twitter.com"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Twitter"
                    className="transition-transform duration-300 hover:text-purple-500 hover:scale-110"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div
            className={`order-1 lg:order-2 flex justify-center transition-opacity duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/20 transition-transform duration-700 hover:scale-[1.02]">
                <Image
                  src="/images/profile.png"
                  alt="Developer Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Scroll Down"
              onClick={handleScrollToProjects}
              className="transition-all duration-300 hover:text-purple-500 hover:bg-purple-500/10"
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
