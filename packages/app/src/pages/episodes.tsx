import React from "react";
import { GetStaticProps } from "next";

import { getSpotifyEpisodes } from "@/pages-utils/spotify";
import type { Episode } from "@/user-interface/components/v0/episodes-data";
import { EpisodesPageContent } from "@/user-interface/components/v0/EpisodesPageContent";
import Layout from "@/user-interface/layouts/Layout";

interface EpisodesPageProps {
  episodes: Episode[];
}

function EpisodesPage({ episodes }: EpisodesPageProps) {
  return <EpisodesPageContent episodes={episodes} />;
}

EpisodesPage.getLayout = function getLayout(page: any) {
  return <Layout pageProps={{ data: { entry: {} } }}>{page}</Layout>;
};

export default EpisodesPage;

export const getStaticProps: GetStaticProps<EpisodesPageProps> = async () => {
  const episodes = await getSpotifyEpisodes();

  return {
    props: {
      episodes,
    },
    revalidate: 3600,
  };
};
