import { Footer } from '@/modules/tenants/ui/components/footer';
import { Navbar } from '@/modules/checkout/ui/components/navbar';

interface LayoutProps {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
	const { slug } = await params;

	return (
		<div className="flex min-h-screen flex-col bg-[#f4f4f0]">
			<Navbar slug={slug} />
			<div className="flex-1">
				<div className="mx-auto max-w-(--breakpoint-xl)">
					{children}
				</div>
			</div>
			<Footer />
		</div>
	);
}
