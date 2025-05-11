"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: formState.email,
        message: formState.message,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } else {
      setIsSubmitting(false);
      setError(result.message || "Something went wrong. Please try again.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-2 sm:px-4 bg-background/50">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities?
              Feel free to reach out!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ScrollReveal delay={1}>
            <Card className="h-full bg-background/80 backdrop-blur-sm border-background-foreground/10 transition-all duration-500 hover:border-purple-500/20 hover-lift">
              <CardHeader className="px-3 sm:px-6">
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Here are the ways you can reach me directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-3 sm:px-6">
                <div className="flex items-start sm:items-center gap-4 transition-transform duration-300 hover:translate-x-1">
                  <div className="bg-purple-500/10 p-3 rounded-full shrink-0 transition-all duration-300 group-hover:bg-purple-500/20">
                    <Mail className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium break-all">
                      akeelabbas29@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-1">
                  <div className="bg-purple-500/10 p-3 rounded-full shrink-0 transition-all duration-300 hover:bg-purple-500/20">
                    <Phone className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+91 8660979096</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-1">
                  <div className="bg-purple-500/10 p-3 rounded-full shrink-0 transition-all duration-300 hover:bg-purple-500/20">
                    <MapPin className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Karnataka, India</p>
                  </div>
                </div>

                {/* <div className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with me on social media
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background p-3 rounded-full hover:bg-purple-500/10 transition-all duration-300 hover:scale-110"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background p-3 rounded-full hover:bg-purple-500/10 transition-all duration-300 hover:scale-110"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background p-3 rounded-full hover:bg-purple-500/10 transition-all duration-300 hover:scale-110"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <Card className="bg-background/80 backdrop-blur-sm border-background-foreground/10 transition-all duration-500 hover:border-purple-500/20 hover-lift">
              <CardHeader className="px-3 sm:px-6">
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:border-purple-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:border-purple-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:border-purple-500/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  {isSubmitted ? (
                    <div className="text-green-500 text-center mt-4 animate-fade-in">
                      Thank you for your message! I'll get back to you soon.
                    </div>
                  ) : error ? (
                    <div className="text-red-500 text-center mt-4 animate-fade-in">
                      {error}
                    </div>
                  ) : null}
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
