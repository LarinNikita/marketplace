import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'email',
	},
	auth: true,
	fields: [
		{
			name: 'username',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			admin: {
				position: 'sidebar',
			},
			name: 'roles',
			type: 'select',
			defaultValue: ['user'],
			hasMany: true,
			options: ['super-user', 'user'],
		},
	],
};
