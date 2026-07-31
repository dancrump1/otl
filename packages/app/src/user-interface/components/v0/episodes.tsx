"use client";

import Link from "next/link";
import type { Episode } from "./episodes-data";
import { EpisodesList } from "./EpisodesList";

interface EpisodesProps {
  episodes: Episode[];
}

export function Episodes({ episodes }: EpisodesProps) {
  const recentEpisodes = episodes.slice(0, 5);

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

        <EpisodesList episodes={recentEpisodes} />
      </div>
    </section>
  );
}
