import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './globals.css';

import { TRPCReactProvider } from '@/trpc/client';

import { Toaster } from '@/components/ui/sonner';

const dmSans = DM_Sans({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Funroad',
	description: 'Multi-Vendor E-Commerce Marketplace',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={`${dmSans.className} antialiased`}>
				<NuqsAdapter>
					<TRPCReactProvider>
						{children}
						<Toaster />
					</TRPCReactProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
