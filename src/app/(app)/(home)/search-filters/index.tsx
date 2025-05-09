'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { Categories } from './categories';
import { SearchInput } from './seacrh-input';

import { useTRPC } from '@/trpc/client';

export const SearchFilters = () => {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

	return (
		<div
			className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12"
			style={{
				backgroundColor: '#f5f5f5',
			}}
		>
			<SearchInput />
			<div className="hidden lg:block">
				<Categories data={data} />
			</div>
		</div>
	);
};

export const SearchFiltersSkeleton = () => {
	return (
		<div
			className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12"
			style={{
				backgroundColor: '#f5f5f5',
			}}
		>
			<SearchInput disabled />
			<div className="hidden lg:block">
				<div className="h-11" />
			</div>
		</div>
	);
};
