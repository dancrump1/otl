"use client";

import { Headphones, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground mb-4">
              Outside The Lobby
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              A show for casual gamers, by casual gamers. Hosted by Jason Sebo and Scott Kalish.
            </p>
            <div className="flex gap-4">
              <a
              href="https://open.spotify.com/show/6ziWU8CjbHpD425wI6yDJn?si=d47a1f0c9cd54662"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Listen on Spotify"
              >
                <Headphones className="w-5 h-5" />
              </a>
              <a
                href={"https://discord.gg/RhJcXdMAxa"}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Join Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Hang Out</h4>
            <ul className="space-y-2">
              <li>
                <a href="#episodes" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Episodes
                </a>
              </li>
              <li>
                <button
                  onClick={() => window.open("https://discord.com", "_blank")}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Discord
                </button>
              </li>
            </ul>
          </div>

          {/* Listen */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Listen On</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.open("https://open.spotify.com/show/6ziWU8CjbHpD425wI6yDJn", "_blank")}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Spotify
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.open("https://podcasts.apple.com", "_blank")}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Apple Podcasts
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.open("https://youtube.com", "_blank")}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  YouTube
                </button>
              </li>
            </ul>
          </div>
        </div>

        
      </div>
    </footer>
  );
}
