import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
	slug: 'products',
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			type: 'text',
		},
		{
			name: 'price',
			type: 'number',
			required: true,
			admin: {
				description: 'Price in USD',
			},
		},
		{
			name: 'category',
			type: 'relationship',
			relationTo: 'categories',
			hasMany: false, // One product can belong to one category
		},
		{
			name: 'tags',
			type: 'relationship',
			relationTo: 'tags',
			hasMany: true, // One product can belong to many tags
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'refundPolicy',
			type: 'select',
			options: [
				'30-day',
				'14-day',
				'7-day',
				'3-day',
				'1-day',
				'no-refunds',
			],
			defaultValue: '7-day',
		},
	],
};
