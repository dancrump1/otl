import type { Episode } from "@/user-interface/components/v0/episodes-data";
import { SPOTIFY_SHOW_ID } from "@/pages-utils/spotifyConstants";

interface SpotifyEpisodeItem {
	id: string;
	name: string;
	description: string;
	html_description?: string;
	duration_ms: number;
	release_date: string;
	external_urls: {
		spotify: string;
	};
}

interface SpotifyEpisodesResponse {
	items: (SpotifyEpisodeItem | null)[];
	next: string | null;
}

interface SpotifyTokenResponse {
	access_token: string;
	expires_in: number;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
	const clientId = process.env.SPOTIFY_CLIENT_ID;
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		console.warn(
			"Spotify credentials not configured. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.",
		);
		return null;
	}

	if (cachedToken && Date.now() < cachedToken.expiresAt) {
		return cachedToken.token;
	}

	const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
		"base64",
	);

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			Authorization: `Basic ${credentials}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: "grant_type=client_credentials",
	});

	if (!response.ok) {
		console.error("Failed to fetch Spotify access token:", response.statusText);
		return null;
	}

	const data: SpotifyTokenResponse = await response.json();
	cachedToken = {
		token: data.access_token,
		expiresAt: Date.now() + (data.expires_in - 60) * 1000,
	};

	return data.access_token;
}

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, " ")
		.trim();
}

function formatDuration(durationMs: number): string {
	const totalMinutes = Math.floor(durationMs / 60000);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}

	return `${minutes}m`;
}

function formatDate(dateStr: string): string {
	const date = new Date(`${dateStr}T00:00:00`);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

function isKatNapEpisode(name: string): boolean {
	return /kat nap/i.test(name);
}

function isSpecialEpisode(name: string): boolean {
	return /boxies|special/i.test(name);
}

function deriveEpisodeNumber(name: string, mainEpisodeNumber: number): string {
	if (isKatNapEpisode(name)) {
		return "Kat Nap";
	}

	if (isSpecialEpisode(name)) {
		return "Special";
	}

	const explicitMatch =
		name.match(/\bEP\s*(\d+)\b/i) ?? name.match(/\bEpisode\s*(\d+)\b/i);
	if (explicitMatch) {
		return `EP ${explicitMatch[1]}`;
	}

	return `EP ${mainEpisodeNumber}`;
}

function mapSpotifyEpisode(
	item: SpotifyEpisodeItem,
	index: number,
	mainEpisodeNumber: number,
): Episode {
	const description = item.html_description
		? stripHtml(item.html_description)
		: item.description;

	return {
		id: item.id,
		number: deriveEpisodeNumber(item.name, mainEpisodeNumber),
		title: item.name,
		description,
		duration: formatDuration(item.duration_ms),
		date: formatDate(item.release_date),
		featured: index === 0,
		spotifyUrl: item.external_urls.spotify,
	};
}

export async function getSpotifyEpisodes(): Promise<Episode[]> {
	const token = await getAccessToken();
	console.log("token", token);
	if (!token) {
		return [];
	}

	const episodes: SpotifyEpisodeItem[] = [];
	let url: string | null =
		`https://api.spotify.com/v1/shows/${SPOTIFY_SHOW_ID}/episodes?market=US&limit=50`;

	while (url) {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			console.error("Failed to fetch Spotify episodes:", response.statusText);
			break;
		}

		const data: SpotifyEpisodesResponse = await response.json();
		episodes.push(
			...data.items.filter(
				(item): item is SpotifyEpisodeItem => item !== null,
			),
		);
		url = data.next;
	}

	let mainEpisodeNumber = episodes.filter(
		(episode) =>
			!isKatNapEpisode(episode.name) && !isSpecialEpisode(episode.name),
	).length;

	return episodes.map((item, index) => {
		const isMainEpisode =
			!isKatNapEpisode(item.name) && !isSpecialEpisode(item.name);
		const currentMainEpisodeNumber = isMainEpisode
			? mainEpisodeNumber--
			: mainEpisodeNumber;

		return mapSpotifyEpisode(item, index, currentMainEpisodeNumber);
	});
}
