import { Navbar } from './navbar';
import { Footer } from './footer';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className="flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-1 bg-[#f4f4f0]">{children}</main>
			<Footer />
		</section>
	);
}
