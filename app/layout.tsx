import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<title>V Infra Engineers Pvt. Ltd. | The Underground Force</title>
				<meta
					name="description"
					content="Market leader for underground and deep foundations. Diaphragm Wall, Top-Down Construction, Shoring & Piling services in Delhi NCR."
				/>
			</head>
			<body className="font-body">
				<ClientProviders>
					<ThemeProvider>
						<Navbar />
						<main>{children}</main>
						<Footer />
					</ThemeProvider>
				</ClientProviders>
			</body>
		</html>
	);
}
