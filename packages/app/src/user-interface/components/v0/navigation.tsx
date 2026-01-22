"use client";

import { useState } from "react";
import { Menu, X, Headphones } from "lucide-react";
import { Button } from "../basic/button";

const navLinks = [
  { label: "Episodes", href: "#episodes" },
  { label: "Discord", href: "https://discord.com", external: true },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
            Outside The Lobby
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => window.open("https://open.spotify.com", "_blank")}
          >
            <Headphones className="w-4 h-4" />
            Listen Now
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button 
              size="sm" 
              className="gap-2 w-full"
              onClick={() => window.open("https://open.spotify.com", "_blank")}
            >
              <Headphones className="w-4 h-4" />
              Listen Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
