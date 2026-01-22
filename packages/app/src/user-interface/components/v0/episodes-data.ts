export interface Episode {
  number: string;
  title: string;
  description: string;
  duration?: string;
  date: string;
  featured: boolean;
  spotifyUrl: string;
}

export const allEpisodes: Episode[] = [
  {
    number: "Special",
    title: "The 2025 OTL Boxies",
    description: "Well folks, we made it. Welcome to our first annual Boxies! We give out some awards, rank our OTL games of the year, and share some of our favorite moments. Thank you all for an amazing year and we'll see you in season 2!",
    duration: "1h 43m",
    date: "Jan 9, 2026",
    featured: true,
    spotifyUrl: "https://open.spotify.com/episode/50kqkod7W5szsh84tYDkol?si=ydYoQdhxQ5-UcpVmZ4Qomg",
  },
  {
    number: "EP 20",
    title: "Crypt Custodian",
    description: "*NEW EMAIL JUST DROPPED* - outsidethelobby@gmail.com. We play as a cat...again. Another short one as we sort of run out of things to say about this cute little game!",
    duration: "38m",
    date: "Dec 18, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/4kVhr5vvs020L5TIwAxd8P?si=JnGHF_IRQRWpep7kqzBxpw",
  },
  {
    number: "Kat Nap",
    title: "Kat Nap - Episode 2",
    description: "We created a bonus series where we can talk about anything we want and we decided to talk about work.",
    duration: "42m",
    date: "Nov 23, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/5oP3M0I7vvkKzZwaxemp6G?si=1R7nznIiQjSfdZaPaFsyww",
  },
  {
    number: "EP 19",
    title: "Undertale",
    description: "Accidental belated Halloween episode this week! We play a very bizarre adventure. Scott regrets his choices and Jason just wants to play more Ghost of Yotei.",
    duration: "54m",
    date: "Nov 9, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/1F0Jof3nCDzgmuhkTRxLjF?si=E18CRyceQfyACaIlPkfFhg",
  },
  {
    number: "EP 18",
    title: "Gris",
    description: "A game that is impossible to pronounce, but does it matter? Jason sure doesn't think so. Scott's back to laptop mic temporarily. Sorry. Join us for another artsy fartsy game discussion.",
    duration: "47m",
    date: "Oct 14, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/5jHbXse0Hb8LzxjdqLPAqy?si=kPOHYQ69QaGjoFE_utsTQg",
  },
  {
    number: "Kat Nap",
    title: "Kat Nap - Episode 1",
    description: "Welcome to Kat Nap! A new show by the OTL team where we talk about everything BUT video games. This week, we discuss cool wedding moments, NY style pizza, cell phone addiction, and how Jason and Scott met!",
    duration: "42m",
    date: "Sep 22, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/6aR4BLwaD8ILuOADpUDMUj?si=sfiMgbF6RWG2HVA--93e2w",
  },
  {
    number: "EP 17",
    title: "Hades",
    description: "Guys, distance makes the heart grow fonder. Scott's on the nostalgia train and Jason may have to bail Mo out of prison...stay tuned. We play one of the greatest video games of the modern era!",
    duration: "56m",
    date: "Sep 7, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/7ggoAqwMSeEVLjmITQUpZu?si=lvHuZkGqQC-mUYsuFETxUw",
  },
  {
    number: "EP 16",
    title: "Inside",
    description: "The devil visits us halfway through recording as we cover the sequel to last week's game! How fun! Scott is too tired to make any valuable points and Jason is still making \"Deez Nutz\" jokes. All is right in the world.",
    duration: "43m",
    date: "Aug 13, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/4NC0kkFrtUvIVGvk0MzoTG?si=hZ7QM9PKT4irLjCtEp8cEg",
  },
  {
    number: "EP 15",
    title: "Limbo",
    description: "We are back from our hiatus to discuss a creepy little game. Jason returns to the homeland from his lovely honeymoon while Scott is just happy to talk about something other than work.",
    duration: "47m",
    date: "Aug 5, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/5eC7H9r1t5TEBnIwx0j9y0?si=7hBWxieXQ_2r_tTLh3l2kQ",
  },
  {
    number: "EP 14",
    title: "The Order: 1886",
    description: "Finally, a game we CAN'T recommend. Jason forces Scott to finish this game in \"order\" to record, hence the delay. Was it worth it? Not at all. Join us as we discuss a bizarre moment in gaming history.",
    duration: "58m",
    date: "Jul 7, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/00GtCNcNdJEeUmomlgakqY?si=kRKmEfjHRdGzhpxb4iC07A",
  },
  {
    number: "EP 13",
    title: "Mario Golf: Toadstool Tour (feat. Tor Adair)",
    description: "Boy oh boy, a lot to unpack here. Scott's wifi is failing, Tor is doing math, and Jason plays us some jams.",
    duration: "1h 27m",
    date: "Jun 19, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/1GUJtK36X87SWBabKuAhB6?si=boMcRCevTpC6yLgSJZsA7Q",
  },
  {
    number: "EP 12",
    title: "Balatro (feat. Jeremy Coen)",
    description: "Special guest Jeremy Coen joins us to talk about your next addiction. We do our best to keep it kosher ;)",
    duration: "1h 5m",
    date: "May 30, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/3W0vIvk6gM7a3lUcTq46y0?si=EQXk37TmR6y-YM-bGjvt7A",
  },
  {
    number: "EP 11",
    title: "Subnautica",
    description: "Dive into underwater nightmare, with light spoilers. We explore the depths of this survival game.",
    date: "May 26, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/3fpiQIdwEjQABWgjvF0f7k?si=M9GzAT93Thmlb43jkO73WA",
    duration: "1hr 3min"
  },
  {
    number: "EP 10",
    title: "A Short Hike",
    description: "Cozy vibes and golden feathers. A relaxing game discussion about this charming indie adventure.",
    date: "May 9, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/5tVMyUbqx3RyARgtGDHX59?si=O4FtkOC6QnacrswLwfrXgg",
    duration: "50min"
  },
  {
    number: "EP 9",
    title: "PowerWash Simulator (feat. Alyse Maguire)",
    description: "Guest Alyse Maguire joins us. So riveting, long screen time. We talk about the surprisingly satisfying world of power washing.",
    date: "Apr 24, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/0c842H49rNj6opWpvuaDnd?si=jAofW0piRgeRGAU74P377g",
    duration: "52min"
  },
  {
    number: "EP 8",
    title: "Stray",
    description: "Well, well, well...look what the cat dragged in. We are BACK. So sorry for the wait. Get used to it, Scott has a job now and Jason is a 'Controller', whatever that means. We talk about the game that puts you in the paws of a cat. meow.",
    date: "Apr 8, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/4uQEZPmwOWu8zOqY7yBOtE",
    duration: "1hr 2min"
  },
  {
    number: "EP 7",
    title: "Celeste",
    description: "This week, we talk about a game talking about feelings. Scott breaks his controller in frustration while Jason cruises through effortlessly. What's new.",
    date: "Mar 19, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/79Bi4xlppJor4R3WU9oeSt",
    duration: "1hr 6min"
  },
  {
    number: "EP 6",
    title: "Journey",
    description: "Anyway, we talk about a piece of art that is also a game. Kind of. Scott and Jason start to open the door for some more harsh criticism on OTL and we'll see how long that lasts.",
    date: "Mar 9, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/6Oyttl9hbM7XMARegTkhog?si=C3bg1mIWSyC3D3EKGII_Xg",
    duration: "57min"
  },
  {
    number: "EP 5",
    title: "Episode 5",
    description: "So begins our great adventure into the Arkham series! This is a personal favorite of the OTL crew. Batman definitely does not kill people...right?...",
    date: "Feb 25, 2025",
    duration: '1 hr 12 min',
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/0NrRQJOqTDF5lmqosisHwt",
  },
  {
    number: "EP 4",
    title: "Episode 4",
    description: "Have you ever wanted to be a hole? Actually, don't answer that. We talk about a very silly game, Jason lets Scott vent about some mental illness, and we tease some future OTL episodes!",
    date: "Feb 18, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/0i4lWMnxBb5CzrV0u29SQt",
    duration: "45min"
  },
  {
    number: "EP 3",
    title: "Little Nightmares",
    description: "This week, we play a S P O O K Y game. Scott keeps the plot summary brief while stumbling over his words per usual. Jason reminds us of the scariest game ever. And we can't stop laughing at ourselves. Enjoy!",
    date: "Feb 13, 2025",
    duration: "55 min 14 sec",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/61fvEdLH2ekWWoJbSWAUnK?si=bmwfwJbiSJi5f3fGEKfVNA",
  },
  {
    number: "EP 2",
    title: "BioShock Infinite",
    description: "This week, we cover the 2013 classic BioShock Infinite. Jason provides a speed-run synopsis of the story and we dive into the mechanics, presentation, and themes of this highly decorated game.",
    date: "Feb 5, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/20RgsZK2PumLtsWR6aZEEt",
    duration: "1hr 21min"
  },
  {
    number: "EP 1",
    title: "Stardew Valley",
    description: "Welcome to Outside The Lobby - A show for casual gamers, by casual gamers. Each week, we dive into one video game that everyone's talking about, or no one's talking about, but whatever the case may be, is worth knowing about, no matter your skill level.",
    date: "Feb 2, 2025",
    featured: false,
    spotifyUrl: "https://open.spotify.com/episode/6kS87zDFDA1BTgPeyUJ7c2?si=5CqjauqrSfS2qhNsUChv3w",
    duration: "58min"
  },
];
