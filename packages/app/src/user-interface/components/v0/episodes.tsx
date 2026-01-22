"use client";

import Link from "next/link";
import { Play, Clock, Calendar } from "lucide-react";
import { Button } from "../basic/button";
import { allEpisodes } from "./episodes-data";

export function Episodes() {
  // Show only the 5 most recent episodes on the home page
  const recentEpisodes = allEpisodes.slice(0, 5);
  return (
    <section id="episodes" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-2">
              Recent Eps
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground">
              What We&apos;ve Been Playing
            </h2>
          </div>
          <Link 
            href="/episodes"
            className="text-primary hover:underline font-medium text-sm self-start md:self-auto"
          >
            View All Episodes →
          </Link>
        </div>

        <div className="grid gap-4">
          {recentEpisodes.map((episode) => (
            <article
              key={episode.number}
              className={`group relative border border-border rounded-lg p-6 transition-all hover:border-primary/50 hover:bg-card ${
                episode.featured ? "bg-card" : "bg-transparent"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Play button */}
                <button 
                  className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                  aria-label={`Play ${episode.title}`}
                  onClick={() => window.open(episode.spotifyUrl || "https://open.spotify.com/show/6ziWU8CjbHpD425wI6yDJn", "_blank")}
                >
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </button>

                {/* Episode info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-primary font-mono text-sm font-medium">
                      {episode.number}
                    </span>
                    {episode.featured && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        Latest
                      </span>
                    )}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-semibold text-foreground mb-1 truncate">
                    {episode.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-1 hidden sm:block">
                    {episode.description}
                  </p>
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm shrink-0">
                  {episode.duration && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {episode.duration}
                    </span>
                  )}
                  <span className="hidden sm:flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {episode.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
