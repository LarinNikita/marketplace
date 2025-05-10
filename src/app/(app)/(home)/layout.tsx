import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Navbar } from '@/modules/home/ui/components/navbar';
import { Footer } from '@/modules/home/ui/components/footer';
import {
	SearchFilters,
	SearchFiltersSkeleton,
} from '@/modules/home/ui/components/search-filters';

import { getQueryClient, trpc } from '@/trpc/server';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

	return (
		<section className="flex min-h-screen flex-col">
			<Navbar />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<SearchFiltersSkeleton />}>
					<SearchFilters />
				</Suspense>
			</HydrationBoundary>
			<main className="flex-1 bg-[#f4f4f0]">{children}</main>
			<Footer />
		</section>
	);
}
