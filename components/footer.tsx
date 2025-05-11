import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 animate-fade-in">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Mirza Akeel. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4 animate-fade-in">
            <Link
              href="https://github.com/akeelabbas29"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 hover:text-purple-500"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/akeelabbas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 hover:text-purple-500"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com/akeelabbas29"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 hover:text-purple-500"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:akeelabbas29@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 hover:text-purple-500"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
