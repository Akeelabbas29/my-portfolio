"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section
      const sections = ["home", "projects", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold group">
            <span className="text-purple-500 transition-colors duration-300 group-hover:text-purple-400">Dev</span>
            <span className="transition-colors duration-300 group-hover:text-purple-500">Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["home", "projects", "about", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-foreground hover:text-purple-500 transition-all duration-300 capitalize relative ${
                  activeSection === section ? "text-purple-500 font-medium" : ""
                }`}
              >
                {section}
                {activeSection === section && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500 rounded-full animate-fade-in"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="transition-transform duration-300 hover:text-purple-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-background/95 backdrop-blur-md rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4 px-4">
              {["home", "projects", "about", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-foreground hover:text-purple-500 transition-all duration-300 py-2 capitalize ${
                    activeSection === section ? "text-purple-500 font-medium" : ""
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
