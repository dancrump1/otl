"use client";

import React from "react";
import Link from "next/link";
import { Play, Clock, Calendar, Headphones } from "lucide-react";
import { Button } from "@/user-interface/components/basic/button";
import { allEpisodes } from "@/user-interface/components/v0/episodes-data";
import { Navigation } from "@/user-interface/components/v0/navigation";
import { Footer } from "@/user-interface/components/v0/footer";
import Layout from "@/user-interface/layouts/Layout";

function EpisodesPage() {
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
                onClick={() => window.open("https://open.spotify.com/show/6ziWU8CjbHpD425wI6yDJn", "_blank")}
              >
                <Headphones className="w-5 h-5" />
                Listen on Spotify
              </Button>
            </div>

            <div className="grid gap-4">
              {allEpisodes.map((episode, index) => (
                <article
                  key={`${episode.number}-${index}`}
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
                      <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-semibold text-foreground mb-1">
                        {episode.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
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
                      <span className="flex items-center gap-1.5">
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
        <Footer />
      </main>
    </>
  );
}

EpisodesPage.getLayout = function getLayout(page: any) {
  return <Layout pageProps={{ data: { entry: {} } }}>{page}</Layout>;
};

export default EpisodesPage;
