'use client';

import Link from 'next/link';

import { generateTenantUrl } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface Props {
	slug: string;
}

export const Navbar = ({ slug }: Props) => {
	return (
		<nav className="h-20 border-b bg-white font-medium">
			<div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
				<p className="text-xl">Checkout</p>
				<Button variant="reverse" asChild className="bg-white">
					<Link href={generateTenantUrl(slug)}>
						Continue Shopping
					</Link>
				</Button>
			</div>
		</nav>
	);
};
