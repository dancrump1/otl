export interface BoxArtAward {
  rank: 1 | 2 | 3;
  game: string;
  boxArtUrl: string;
  jasonQuote: string;
  scottQuote: string;
}

export interface BoxiesEdition {
  year: number;
  title: string;
  intro?: string;
  awards: BoxArtAward[];
}

export function getPodiumOrder(awards: BoxArtAward[]): BoxArtAward[] {
  const byRank = Object.fromEntries(awards.map((award) => [award.rank, award]));
  return [byRank[2], byRank[1], byRank[3]].filter(Boolean) as BoxArtAward[];
}

export function getRankStyles(rank: 1 | 2 | 3) {
  switch (rank) {
    case 1:
      return {
        medal: "text-primary",
        pedestal: "h-28 md:h-36 bg-primary/20 border-primary/40",
        label: "1st Place",
      };
    case 2:
      return {
        medal: "text-slate-300",
        pedestal: "h-20 md:h-28 bg-slate-400/10 border-slate-400/30",
        label: "2nd Place",
      };
    case 3:
      return {
        medal: "text-amber-700",
        pedestal: "h-16 md:h-24 bg-amber-900/20 border-amber-800/30",
        label: "3rd Place",
      };
  }
}

export function mapCmsBoxiesToEdition(boxies: {
  boxiesYear?: number | null;
  boxiesTitle?: string | null;
  boxiesIntro?: string | null;
  boxiesAwards?: Array<{
    title?: string | null;
    boxiesPlace?: number | null;
    jasonQuote?: string | null;
    scottQuote?: string | null;
    boxArt?: Array<{ url?: string | null } | null> | null;
  } | null> | null;
} | null | undefined): BoxiesEdition | null {
  if (!boxies?.boxiesYear || !boxies.boxiesTitle) {
    return null;
  }

  const awards = (boxies.boxiesAwards ?? [])
    .filter(Boolean)
    .map((award) => {
      const rank = award?.boxiesPlace;
      const boxArtUrl = award?.boxArt?.[0]?.url;

      if (
        rank !== 1 &&
        rank !== 2 &&
        rank !== 3 ||
        !award?.title ||
        !boxArtUrl ||
        !award.jasonQuote ||
        !award.scottQuote
      ) {
        return null;
      }

      return {
        rank,
        game: award.title,
        boxArtUrl,
        jasonQuote: award.jasonQuote,
        scottQuote: award.scottQuote,
      } satisfies BoxArtAward;
    })
    .filter(Boolean) as BoxArtAward[];

  if (awards.length !== 3) {
    return null;
  }

  return {
    year: boxies.boxiesYear,
    title: boxies.boxiesTitle,
    intro: boxies.boxiesIntro ?? undefined,
    awards,
  };
}
