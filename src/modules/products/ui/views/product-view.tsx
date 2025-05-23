'use client';

import { Fragment } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { LinkIcon, StarIcon } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { formatCurrency, generateTenantUrl } from '@/lib/utils';

import { useTRPC } from '@/trpc/client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StarRating } from '@/components/star-rating';

const CartButton = dynamic(
	() => import('../components/cart-button').then((mod) => mod.CartButton),
	{
		ssr: false,
		loading: () => (
			<Button disabled variant="reverse" className="flex-1">
				Add to cart
			</Button>
		),
	},
);

interface Props {
	productId: string;
	tenantSlug: string;
}

export const ProductView = ({ productId, tenantSlug }: Props) => {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.products.getOne.queryOptions({ id: productId }),
	);

	return (
		<div className="px-4 py-10 lg:px-12">
			<div className="overflow-hidden rounded-sm border bg-white">
				<div className="relative aspect-[3.9] border-b">
					<Image
						src={data.image?.url || '/placeholder.png'}
						alt={data.name}
						fill
						className="object-cover"
					/>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-6">
					<div className="col-span-4">
						<div className="p-6">
							<h1 className="text-4xl font-medium">
								{data.name}
							</h1>
						</div>
						<div className="flex border-y">
							<div className="flex items-center justify-center border-r px-6 py-4">
								<div className="w-fit border bg-pink-400 px-2 py-1">
									<p className="text-base font-medium">
										{formatCurrency(data.price)}
									</p>
								</div>
							</div>
							<div className="flex items-center justify-center px-6 py-4 lg:border-r">
								<Link
									href={generateTenantUrl(tenantSlug)}
									className="flex items-center gap-2"
								>
									{data.tenant.image?.url && (
										<Image
											src={data.tenant.image?.url}
											alt={data.tenant.name}
											width={20}
											height={20}
											className="size-[20px] shrink-0 rounded-full border"
										/>
									)}
									<p className="text-base font-medium underline">
										{data.tenant.name}
									</p>
								</Link>
							</div>
							<div className="hidden items-center justify-center px-6 py-4 lg:flex">
								<div className="flex items-center gap-1">
									<StarRating rating={3} />
								</div>
							</div>
						</div>
						<div className="block items-center justify-center border-b px-6 py-4 lg:hidden">
							<div className="flex items-center gap-1">
								<StarRating rating={3} text={`${5} ratings`} />
							</div>
						</div>
						<div className="p-6">
							{data.description ? (
								<p>{data.description}</p>
							) : (
								<p className="text-main-foreground font-medium italic">
									No description provided
								</p>
							)}
						</div>
					</div>
					<div className="col-span-2">
						<div className="h-full border-t lg:border-t-0 lg:border-l">
							<div className="flex flex-col gap-4 border-b p-6">
								<div className="flex flex-row items-center gap-2">
									<CartButton
										isPurchase={data.isPurchase}
										productId={productId}
										tenantSlug={tenantSlug}
									/>
									<Button
										variant="reverse"
										size="icon"
										className="bg-white"
										onClick={() => {}}
										disabled={false}
									>
										<LinkIcon />
									</Button>
								</div>
								<p className="text-center font-medium">
									{data.refundPolicy === 'no-refunds'
										? 'No refunds'
										: `${data.refundPolicy} money back guarantee`}
								</p>
							</div>
							<div className="p-6">
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-medium">
										Ratings
									</h3>
									<div className="flex items-center gap-x-1 font-medium">
										<StarIcon className="size-4 fill-black" />
										<p>({5})</p>
										<p className="text-base">{5} ratings</p>
									</div>
								</div>
								<div className="mt-4 grid grid-cols-[auto_1fr_auto] gap-3">
									{[5, 4, 3, 2, 1].map((stars) => (
										<Fragment key={stars}>
											<div className="font-medium">
												{stars}{' '}
												{stars === 1 ? 'star' : 'stars'}
											</div>
											<Progress
												value={25}
												className="h-[1lh] rounded-full"
											/>
											<div className="font-medium">
												{25}%
											</div>
										</Fragment>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
