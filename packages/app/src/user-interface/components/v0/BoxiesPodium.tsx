"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";

import type { Episode } from "./episodes-data";
import {
  getPodiumOrder,
  getRankStyles,
  type BoxArtAward,
  type BoxiesEdition,
} from "./boxies-data";
import { SPOTIFY_SHOW_URL } from "@/pages-utils/spotifyConstants";

interface BoxiesPodiumProps {
  boxies: BoxiesEdition;
  episodes?: Episode[];
}

function PodiumSlot({ award }: { award: BoxArtAward }) {
  const [revealed, setRevealed] = useState(false);
  const styles = getRankStyles(award.rank);

  return (
    <div className="flex flex-col items-center flex-1 max-w-[220px]">
      <button
        type="button"
        className="group relative w-full aspect-[2/3] mb-3 cursor-pointer text-left"
        onClick={() => setRevealed((current) => !current)}
        aria-label={`${award.game} - ${styles.label}. Tap to read host quotes.`}
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden border border-border shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/50 group-hover:shadow-primary/10 group-hover:shadow-xl">
          <img
            src={award.boxArtUrl}
            alt={`${award.game} box art`}
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className={`absolute inset-0 rounded-lg bg-background/95 transition-opacity duration-300 p-4 flex flex-col justify-center gap-4 border border-primary/30 ${
            revealed
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          }`}
        >
          <figure>
            <figcaption className="text-primary text-xs font-semibold uppercase tracking-wide mb-1">
              Jason
            </figcaption>
            <blockquote className="text-foreground text-sm leading-relaxed">
              &ldquo;{award.jasonQuote}&rdquo;
            </blockquote>
          </figure>
          <figure>
            <figcaption className="text-accent text-xs font-semibold uppercase tracking-wide mb-1">
              Scott
            </figcaption>
            <blockquote className="text-foreground text-sm leading-relaxed">
              &ldquo;{award.scottQuote}&rdquo;
            </blockquote>
          </figure>
        </div>
      </button>

      <div
        className={`w-full rounded-t-lg border px-3 py-3 text-center ${styles.pedestal}`}
      >
        <p className={`text-xs font-semibold uppercase tracking-wider ${styles.medal}`}>
          {styles.label}
        </p>
        <p className="font-[family-name:var(--font-heading)] text-sm md:text-base font-bold text-foreground mt-1 truncate">
          {award.game}
        </p>
      </div>
    </div>
  );
}

export function BoxiesPodium({ boxies, episodes = [] }: BoxiesPodiumProps) {
  const podiumOrder = getPodiumOrder(boxies.awards);
  const boxiesEpisode = episodes.find(
    (episode) =>
      /boxies/i.test(episode.title) || /boxies/i.test(episode.description),
  );
  const listenUrl = boxiesEpisode?.spotifyUrl ?? SPOTIFY_SHOW_URL;

  return (
    <section id="boxies" className="py-24 px-6 border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-2 flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" />
            Annual Awards
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground mb-3">
            {boxies.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {boxies.intro ??
              `Best video game box art of ${boxies.year}, as voted by the OTL crew. Hover a cover to hear what Jason and Scott had to say.`}
          </p>
        </div>

        <div className="flex items-end justify-center gap-3 md:gap-6 max-w-3xl mx-auto">
          {podiumOrder.map((award) => (
            <PodiumSlot key={award.rank} award={award} />
          ))}
        </div>

        {boxiesEpisode && (
          <p className="text-center mt-10">
            <button
              type="button"
              onClick={() => window.open(listenUrl, "_blank")}
              className="text-primary hover:underline text-sm font-medium"
            >
              Listen to the {boxies.year} Boxies episode →
            </button>
          </p>
        )}
      </div>
    </section>
  );
}
