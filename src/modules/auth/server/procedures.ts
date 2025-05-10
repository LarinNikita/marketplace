import { TRPCError } from '@trpc/server';
import { headers as getHeaders } from 'next/headers';

import { generatedAuthCookie } from '../utils';
import { loginSchema, registerSchema } from '../schemas';

import { baseProcedure, createTRPCRouter } from '@/trpc/init';

export const authRouter = createTRPCRouter({
	session: baseProcedure.query(async ({ ctx }) => {
		const headers = await getHeaders();

		const session = await ctx.db.auth({ headers });

		return session;
	}),
	register: baseProcedure
		.input(registerSchema)
		.mutation(async ({ ctx, input }) => {
			const existingData = await ctx.db.find({
				collection: 'users',
				limit: 1,
				where: {
					username: {
						equals: input.username,
					},
				},
			});

			const existingUser = existingData.docs[0];

			if (existingUser) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Username already taken',
				});
			}

			await ctx.db.create({
				collection: 'users',
				data: {
					email: input.email,
					username: input.username,
					password: input.password, // This will be hashed by Payload
				},
			});

			const data = await ctx.db.login({
				collection: 'users',
				data: {
					email: input.email,
					password: input.password,
				},
			});

			if (!data.token) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Invalid email or password',
				});
			}

			await generatedAuthCookie({
				prefix: ctx.db.config.cookiePrefix,
				value: data.token,
			});
		}),
	login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
		const data = await ctx.db.login({
			collection: 'users',
			data: {
				email: input.email,
				password: input.password,
			},
		});

		if (!data.token) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Invalid email or password',
			});
		}

		await generatedAuthCookie({
			prefix: ctx.db.config.cookiePrefix,
			value: data.token,
		});

		return data;
	}),
});
