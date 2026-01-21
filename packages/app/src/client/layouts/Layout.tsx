import HeadContent from "../components/HeadContent";

export default function Layout({ children, pageProps }) {
	let seo;

	if (pageProps?.data?.entry?.seo) {
		seo = pageProps.data.entry.seo;
	}

	return (
		<>
			<HeadContent {...seo} />
			<nav />
			{children}
			<footer />
		</>
	);
}
