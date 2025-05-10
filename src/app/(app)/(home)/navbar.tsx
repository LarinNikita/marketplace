'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/lib/utils';

import { NavbarSidebar } from './navbar-sidebar';

import { useTRPC } from '@/trpc/client';

import { Button } from '@/components/ui/button';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['700'],
});

interface NavbarItemProps {
	href: string;
	children: React.ReactNode;
	isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
	return (
		<Button
			asChild
			variant="noShadow"
			className={cn(
				'hover:border-main rounded-full border-transparent bg-transparent px-3.5 text-lg hover:bg-transparent',
				isActive &&
					'bg-black text-white hover:border-black hover:bg-black hover:text-white',
			)}
		>
			<Link href={href}>{children}</Link>
		</Button>
	);
};

const navbarItems = [
	{
		href: '/',
		children: 'Home',
	},
	{
		href: '/about',
		children: 'About',
	},
	{
		href: '/features',
		children: 'Features',
	},
	{
		href: '/pricing',
		children: 'Pricing',
	},
	{
		href: '/contact',
		children: 'Contact',
	},
];

export const Navbar = () => {
	const pathname = usePathname();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const trpc = useTRPC();
	const session = useQuery(trpc.auth.session.queryOptions());

	return (
		// TODO Refactor responsive ui
		<nav className="flex h-20 justify-between overflow-clip border-b bg-white font-medium">
			<Link href="/" className="flex items-center px-6">
				<span
					className={cn('text-5xl font-semibold', poppins.className)}
				>
					funroad
				</span>
			</Link>
			<NavbarSidebar
				open={isSidebarOpen}
				onOpenChange={setIsSidebarOpen}
				items={navbarItems}
			/>
			<div className="hidden items-center gap-4 lg:flex">
				{navbarItems.map((item) => (
					<NavbarItem
						key={item.href}
						href={item.href}
						isActive={pathname === item.href}
					>
						{item.children}
					</NavbarItem>
				))}
			</div>
			{session.data?.user ? (
				<div className="hidden lg:flex">
					<Button
						asChild
						variant="noShadow"
						className="h-full rounded-none border-t-0 border-r-0 border-b-0 border-l bg-black px-12 text-lg text-white transition-colors hover:bg-pink-400 hover:text-black"
					>
						<Link href="/admin">Dashboard</Link>
					</Button>
				</div>
			) : (
				<div className="hidden lg:flex">
					<Button
						asChild
						variant="noShadow"
						className="h-full rounded-none border-t-0 border-r-0 border-b-0 border-l bg-white px-12 text-lg transition-colors hover:bg-pink-400"
					>
						<Link prefetch href="/sign-in">
							Log in
						</Link>
					</Button>
					<Button
						asChild
						variant="noShadow"
						className="h-full rounded-none border-t-0 border-r-0 border-b-0 border-l bg-black px-12 text-lg text-white transition-colors hover:bg-pink-400 hover:text-black"
					>
						<Link prefetch href="/sign-up">
							Start selling
						</Link>
					</Button>
				</div>
			)}
			<div className="flex items-center justify-center lg:hidden">
				<Button
					variant="noShadow"
					className="size-12 border-transparent bg-white hover:bg-black/5"
					onClick={() => setIsSidebarOpen(true)}
				>
					<MenuIcon />
				</Button>
			</div>
		</nav>
	);
};
