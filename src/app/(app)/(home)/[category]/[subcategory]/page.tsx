import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import {
	ProductList,
	ProductListSkeleton,
} from '@/modules/products/ui/components/product-list';

import { getQueryClient, trpc } from '@/trpc/server';

interface Props {
	params: Promise<{ subcategory: string }>;
}

export default async function Page({ params }: Props) {
	const { subcategory } = await params;

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.products.getMany.queryOptions({ category: subcategory }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<ProductListSkeleton />}>
				<ProductList category={subcategory} />
			</Suspense>
		</HydrationBoundary>
	);
}
