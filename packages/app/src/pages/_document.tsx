import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html className="overflow-x-hidden">
			<Head />
			<body className="overflow-x-clip">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
