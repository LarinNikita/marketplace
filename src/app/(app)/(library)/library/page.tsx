import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { DEFAULT_LIMIT } from '@/constants';

import { LibraryView } from '@/modules/library/ui/views/library-view';
import { ProductViewSkeleton } from '@/modules/library/ui/views/product-view';

import { getQueryClient, trpc } from '@/trpc/server';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const queryClient = getQueryClient();
	void queryClient.prefetchInfiniteQuery(
		trpc.library.getMany.infiniteQueryOptions({
			limit: DEFAULT_LIMIT,
		}),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<ProductViewSkeleton />}>
				<LibraryView />
			</Suspense>
		</HydrationBoundary>
	);
}
