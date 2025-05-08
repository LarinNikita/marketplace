import configPromise from '@payload-config';
import { getPayload } from 'payload';

export default async function Home() {
	const payload = await getPayload({
		config: configPromise,
	});

	const data = await payload.find({
		collection: 'categories',
		depth: 1, // Populate subcategories
		where: {
			parent: {
				exists: false,
			},
		},
	});

	return <pre>{JSON.stringify(data, null, 4)}</pre>;
}
