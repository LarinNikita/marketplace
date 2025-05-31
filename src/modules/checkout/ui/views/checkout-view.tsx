'use client';

import { useEffect } from 'react';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { InboxIcon, LoaderIcon } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import CheckoutItem from '../components/checkout-item';
import { CheckoutSidebar } from '../components/checkout-sidebar';

import { useCart } from '../../hooks/use-cart';
import { useCheckoutStates } from '../../hooks/use-checkout-states';

import { generateTenantUrl } from '@/lib/utils';

import { useTRPC } from '@/trpc/client';

interface Props {
	tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: Props) => {
	const router = useRouter();
	const [states, setStates] = useCheckoutStates();
	const { productIds, removeProduct, clearCart } = useCart(tenantSlug);

	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { data, error, isLoading } = useQuery(
		trpc.checkout.getProducts.queryOptions({
			ids: productIds,
		}),
	);

	const purchase = useMutation(
		trpc.checkout.purchase.mutationOptions({
			onMutate: () => {
				setStates({ success: false, cancel: false });
			},
			onSuccess: (data) => {
				window.location.href = data.url;
			},
			onError: (error) => {
				if (error.data?.code === 'UNAUTHORIZED') {
					// TODO Modify when subdomains enable
					router.push('/sign-in');
				}

				toast.error(error.message);
			},
		}),
	);

	useEffect(() => {
		if (states.success) {
			setStates({ success: false, cancel: false });
			clearCart();
			queryClient.invalidateQueries(
				trpc.library.getMany.infiniteQueryFilter(),
			);
			router.push('/library');
		}
	}, [
		states.success,
		clearCart,
		router,
		setStates,
		queryClient,
		trpc.library.getMany,
	]);

	useEffect(() => {
		if (error?.data?.code === 'NOT_FOUND') {
			clearCart();
			toast.warning('Invalid products found, cart cleared');
		}
	}, [error, clearCart]);

	if (isLoading) {
		return (
			<div className="px-4 pt-4 lg:px-16 lg:pt-16">
				<div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
					<LoaderIcon className="text-main-foreground animate-spin" />
				</div>
			</div>
		);
	}

	if (data?.totalDocs === 0 || error?.data?.code === 'NOT_FOUND') {
		return (
			<div className="px-4 pt-4 lg:px-16 lg:pt-16">
				<div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
					<InboxIcon />
					<p className="text-base font-medium">No products found</p>
				</div>
			</div>
		);
	}

	return (
		<div className="px-4 pt-4 lg:px-16 lg:pt-16">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
				<div className="lg:col-span-4">
					<div className="overflow-hidden rounded-md border bg-white">
						{data?.docs.map((product, index) => (
							<CheckoutItem
								key={product.id}
								isLast={index === data.docs.length - 1}
								imageUrl={product.image?.url}
								name={product.name}
								productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
								tenantUrl={generateTenantUrl(
									product.tenant.slug,
								)}
								tenantName={product.tenant.name}
								price={product.price}
								onRemove={() => removeProduct(product.id)}
							/>
						))}
					</div>
				</div>
				<div className="lg:col-span-3">
					<CheckoutSidebar
						total={data?.totalPrice || 0}
						onPurchase={() =>
							purchase.mutate({ tenantSlug, productIds })
						}
						isCanceled={states.cancel}
						disable={purchase.isPending}
					/>
				</div>
			</div>
		</div>
	);
};
