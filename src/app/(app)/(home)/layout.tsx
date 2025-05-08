import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { Category } from '@/payload-types';

import { Navbar } from './navbar';
import { Footer } from './footer';
import { CustomCategory } from './types';
import { SearchFilters } from './search-filters';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const payload = await getPayload({
		config: configPromise,
	});

	const data = await payload.find({
		collection: 'categories',
		depth: 1, // Populate subcategories, subcategories.[0] will be a type of "Categories"
		pagination: false,
		where: {
			parent: {
				exists: false,
			},
		},
		sort: 'name',
	});

	const formattedData: CustomCategory[] = data.docs.map((doc) => ({
		...doc,
		subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
			// Because of 'depth:1' we are confident doc will be a type of "Category"
			...(doc as Category),
			subcategories: undefined,
		})),
	}));

	return (
		<section className="flex min-h-screen flex-col">
			<Navbar />
			<SearchFilters data={formattedData} />
			<main className="flex-1 bg-[#f4f4f0]">{children}</main>
			<Footer />
		</section>
	);
}
