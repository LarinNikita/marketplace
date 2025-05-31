import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from 'lucide-react';

import { CategoriesSidebar } from './categories-sidebar';

import { useTRPC } from '@/trpc/client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
	disabled?: boolean;
	defaultValue?: string | undefined;
	onChange?: (values: string) => void;
}

export const SearchInput = ({ disabled, defaultValue, onChange }: Props) => {
	const [searchValue, setSearchValue] = useState(defaultValue || '');
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const trpc = useTRPC();
	const session = useQuery(trpc.auth.session.queryOptions());

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onChange?.(searchValue);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchValue, onChange]);

	return (
		<div className="flex w-full items-center gap-2">
			<CategoriesSidebar
				open={isSidebarOpen}
				onOpenChange={setIsSidebarOpen}
			/>
			<div className="relative w-full">
				<SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
				<Input
					className="pl-8"
					placeholder="Search products"
					disabled={disabled}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>
			<Button
				variant="reverse"
				className="flex size-10 shrink-0 cursor-pointer bg-white lg:hidden"
				onClick={() => setIsSidebarOpen(true)}
			>
				<ListFilterIcon />
			</Button>
			{session.data?.user && (
				<Button variant="reverse" asChild className="bg-white">
					<Link prefetch href="/library">
						<BookmarkCheckIcon />
						Library
					</Link>
				</Button>
			)}
		</div>
	);
};
