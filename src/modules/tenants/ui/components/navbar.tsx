'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ShoppingCartIcon } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { generateTenantUrl } from '@/lib/utils';

import { useTRPC } from '@/trpc/client';

import { Button } from '@/components/ui/button';

const CheckoutButton = dynamic(
	() =>
		import('@/modules/checkout/ui/components/checkout-button').then(
			(mod) => mod.CheckoutButton,
		),
	{
		ssr: false,
		loading: () => (
			<Button disabled variant="reverse" className="bg-white">
				<ShoppingCartIcon />
			</Button>
		),
	},
);

interface Props {
	slug: string;
}

export const Navbar = ({ slug }: Props) => {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.tenants.getOne.queryOptions({ slug }),
	);

	return (
		<nav className="h-20 border-b bg-white font-medium">
			<div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
				<Link
					href={generateTenantUrl(slug)}
					className="flex items-center gap-2"
				>
					{data.image?.url && (
						<Image
							src={data.image?.url}
							alt={slug}
							width={32}
							height={32}
							className="size-[32px] shrink-0 rounded-full border"
						/>
					)}
					<p className="text-xl">{data.name}</p>
				</Link>
				<CheckoutButton hideIfEmpty tenantSlug={slug} />
			</div>
		</nav>
	);
};

export const NavbarSkeleton = () => {
	return (
		<nav className="h-20 border-b bg-white font-medium">
			<div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
				<Button disabled variant="reverse" className="bg-white">
					<ShoppingCartIcon />
				</Button>
			</div>
		</nav>
	);
};
