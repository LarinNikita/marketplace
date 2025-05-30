import type { SearchParams } from 'nuqs/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { DEFAULT_LIMIT } from '@/constants';

import { loadProductFilters } from '@/modules/products/search-params';
import { ProductListView } from '@/modules/products/ui/views/product-list-view';

import { getQueryClient, trpc } from '@/trpc/server';

interface Props {
	searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: Props) {
	const filters = await loadProductFilters(searchParams);

	const queryClient = getQueryClient();
	void queryClient.prefetchInfiniteQuery(
		trpc.products.getMany.infiniteQueryOptions({
			...filters,
			limit: DEFAULT_LIMIT,
		}),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductListView />
		</HydrationBoundary>
	);
}
