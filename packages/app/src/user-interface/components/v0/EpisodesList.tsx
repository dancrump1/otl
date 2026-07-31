"use client";

import { Play, Clock, Calendar } from "lucide-react";
import type { Episode } from "./episodes-data";
import { SPOTIFY_SHOW_URL } from "@/pages-utils/spotifyConstants";

interface EpisodesListProps {
  episodes: Episode[];
  descriptionLineClamp?: 1 | 2;
  showDateOnMobile?: boolean;
}

export function EpisodesList({
  episodes,
  descriptionLineClamp = 1,
  showDateOnMobile = false,
}: EpisodesListProps) {
  const descriptionClass =
    descriptionLineClamp === 2 ? "line-clamp-2" : "line-clamp-1";

  return (
    <div className="grid gap-4">
      {episodes.map((episode) => (
        <article
          key={episode.id}
          className={`group relative border border-border rounded-lg p-6 transition-all hover:border-primary/50 hover:bg-card ${
            episode.featured ? "bg-card" : "bg-transparent"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <button
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
              aria-label={`Play ${episode.title}`}
              onClick={() =>
                window.open(episode.spotifyUrl || SPOTIFY_SHOW_URL, "_blank")
              }
            >
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </button>

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
              <h3
                className={`font-[family-name:var(--font-heading)] text-lg md:text-xl font-semibold text-foreground mb-1 ${
                  descriptionLineClamp === 1 ? "truncate" : ""
                }`}
              >
                {episode.title}
              </h3>
              <p
                className={`text-muted-foreground text-sm ${descriptionClass} ${
                  descriptionLineClamp === 1 ? "hidden sm:block" : ""
                }`}
              >
                {episode.description}
              </p>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground text-sm shrink-0">
              {episode.duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {episode.duration}
                </span>
              )}
              <span
                className={`${
                  showDateOnMobile ? "flex" : "hidden sm:flex"
                } items-center gap-1.5`}
              >
                <Calendar className="w-4 h-4" />
                {episode.date}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
