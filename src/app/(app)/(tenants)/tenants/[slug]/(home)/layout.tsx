import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Footer } from '@/modules/tenants/ui/components/footer';
import { Navbar, NavbarSkeleton } from '@/modules/tenants/ui/components/navbar';

import { getQueryClient, trpc } from '@/trpc/server';

interface LayoutProps {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
	const { slug } = await params;

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.tenants.getOne.queryOptions({
			slug,
		}),
	);

	return (
		<div className="flex min-h-screen flex-col bg-[#f4f4f0]">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<NavbarSkeleton />}>
					<Navbar slug={slug} />
				</Suspense>
			</HydrationBoundary>
			<div className="flex-1">
				<div className="mx-auto max-w-(--breakpoint-xl)">
					{children}
				</div>
			</div>
			<Footer />
		</div>
	);
}
