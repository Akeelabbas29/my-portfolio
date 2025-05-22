import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string; // Optional
  githubUrl?: string; // Optional
  // Add other project-specific fields if necessary
}

interface NewProjectCardProps {
  project: Project;
  className?: string;
}

const NewProjectCard = React.forwardRef<HTMLDivElement, NewProjectCardProps>(
  ({ project, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-full", // Ensures the card itself takes full height of its grid cell
          "bg-card/80 dark:bg-card/60 backdrop-blur-md", // Semi-transparent blurred background
          "rounded-xl", // Slightly larger rounding
          "shadow-md hover:shadow-lg", // Base shadow and hover shadow
          "transition-all duration-300 ease-in-out hover:scale-[1.02]", // Hover scale effect
          className
        )}
      >
        {/* Image Presentation */}
        {project.image && (
          <div className="relative w-full aspect-[16/9] rounded-t-xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Image zoom on group hover (card)
            />
             {/* Optional: Subtle gradient overlay if text were on image */}
             {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> */}
          </div>
        )}

        {/* Content Area */}
        <div className="flex flex-col flex-grow p-5"> {/* p-5 for padding */}
          {/* Title */}
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">{project.title}</h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow"> {/* flex-grow here if tags are few */}
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Footer/Links - Pushed to bottom by flex-grow on parent or description */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-auto pt-4 flex justify-start gap-3"> {/* justify-start and gap */}
              {project.liveUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs hover:border-primary/80 hover:text-primary"
                  asChild
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-xs hover:text-primary"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

NewProjectCard.displayName = 'NewProjectCard';

export default NewProjectCard;
