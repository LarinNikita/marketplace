import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant';

import { Tags } from './collections/Tags';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Orders } from './collections/Orders';
import { Tenants } from './collections/Tenants';
import { Reviews } from './collections/Reviews';
import { Products } from './collections/Products';
import { Categories } from './collections/Categories';

import { isSuperAdmin } from './lib/access';

import { Config } from './payload-types';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		components: {
			beforeNavLinks: ['@/components/stripe-verify#StripeVerify'],
		},
	},
	collections: [
		Users,
		Media,
		Categories,
		Products,
		Tags,
		Tenants,
		Orders,
		Reviews,
	],
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures,
			UploadFeature({
				collections: {
					media: {
						fields: [
							{
								name: 'alt',
								type: 'text',
							},
						],
					},
				},
			}),
		],
	}),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || '',
	}),
	sharp,
	plugins: [
		payloadCloudPlugin(),
		multiTenantPlugin<Config>({
			collections: {
				products: {},
				media: {},
			},
			tenantsArrayField: {
				includeDefaultField: false,
			},
			userHasAccessToAllTenants: (user) => isSuperAdmin(user),
		}),
		// storage-adapter-placeholder
	],
});
