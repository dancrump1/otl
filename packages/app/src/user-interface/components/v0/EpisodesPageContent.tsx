"use client";

import { Headphones } from "lucide-react";

import { SPOTIFY_SHOW_URL } from "@/pages-utils/spotifyConstants";
import type { Episode } from "@/user-interface/components/v0/episodes-data";
import { Button } from "@/user-interface/components/basic/button";
import { Navigation } from "@/user-interface/components/v0/navigation";
import { Footer } from "@/user-interface/components/v0/footer";
import { EpisodesList } from "@/user-interface/components/v0/EpisodesList";

interface EpisodesPageContentProps {
  episodes: Episode[];
}

export function EpisodesPageContent({ episodes }: EpisodesPageContentProps) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background dark:bg-zinc-950 pt-16">
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <p className="text-primary font-medium tracking-wide uppercase text-sm mb-2">
                  Full Catalog
                </p>
                <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-foreground">
                  All Episodes
                </h1>
              </div>
              <Button
                size="lg"
                className="gap-2"
                onClick={() => window.open(SPOTIFY_SHOW_URL, "_blank")}
              >
                <Headphones className="w-5 h-5" />
                Listen on Spotify
              </Button>
            </div>

            <EpisodesList
              episodes={episodes}
              descriptionLineClamp={2}
              showDateOnMobile
            />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
