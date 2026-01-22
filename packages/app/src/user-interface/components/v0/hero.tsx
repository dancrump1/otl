"use client";

import { Headphones, MessageCircle } from "lucide-react";
import { Button } from "../basic/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-primary font-medium tracking-wide uppercase text-sm mb-6">
          A Video Game Podcast
        </p>
        
        <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 text-balance">
          Outside The Lobby
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 text-pretty">
          Welcome to Outside The Lobby - A show for casual gamers, by casual gamers. Each week, we dive into one video game that everyone's talking about, or no one's talking about, but whatever the case may be, is worth knowing about, no matter your skill level.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="gap-2 text-base px-8"
            onClick={() => window.open("https://open.spotify.com/show/6ziWU8CjbHpD425wI6yDJn", "_blank")}
          >
            <Headphones className="w-5 h-5" />
            Listen on Spotify
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2 text-white px-8 bg-transparent"
            onClick={() => window.open("https://discord.com", "_blank")}
          >
            <MessageCircle className="w-5 h-5" />
            Join the Discord
          </Button>
        </div>
        
        <p className="text-muted-foreground text-sm mt-8">
          New episodes every 2 weeks (they said and then lied again and again...)
          <br/>
          Also Kat Naps! They're not episodes... but they are....
        </p>
      </div>
    </section>
  );
}
