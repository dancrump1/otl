"use client";

import { Play, Clock, Calendar } from "lucide-react";
import { Button } from "../basic/button";

const episodes = [
  {
    number: "EP 47",
    title: "Is This The Best Open World Game Ever?",
    description: "We finally played that one everyone's been hyping up. Spoiler: we have opinions.",
    duration: "1h 23m",
    date: "Jan 15, 2026",
    featured: true,
  },
  {
    number: "EP 46",
    title: "The State of Multiplayer in 2026",
    description: "Are we cooked? Maybe. Let's talk about it.",
    duration: "58m",
    date: "Jan 1, 2026",
    featured: false,
  },
  {
    number: "EP 45",
    title: "Games We Can't Wait to Play This Year",
    description: "Our personal hype lists. Some bangers, some sleepers, all vibes.",
    duration: "1h 12m",
    date: "Dec 18, 2025",
    featured: false,
  },
  {
    number: "EP 44",
    title: "GOTY 2025: The Final Debate",
    description: "We argued for two hours. Nobody changed their mind. Classic.",
    duration: "2h 05m",
    date: "Dec 4, 2025",
    featured: false,
  },
];

export function Episodes() {
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
          <Button variant="link" className="text-primary p-0 h-auto self-start md:self-auto">
            All episodes on Spotify
          </Button>
        </div>

        <div className="grid gap-4">
          {episodes.map((episode) => (
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
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {episode.duration}
                  </span>
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
