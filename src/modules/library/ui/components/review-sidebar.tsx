'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ReviewForm } from './review-form';

import { useTRPC } from '@/trpc/client';

interface Props {
	productId: string;
}

export const ReviewSidebar = ({ productId }: Props) => {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.reviews.getOne.queryOptions({
			productId,
		}),
	);

	return <ReviewForm productId={productId} initialData={data} />;
};
