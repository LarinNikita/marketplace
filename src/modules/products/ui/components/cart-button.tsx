import Link from 'next/link';

import { cn } from '@/lib/utils';

import { useCart } from '@/modules/checkout/hooks/use-cart';

import { Button } from '@/components/ui/button';

interface Props {
	tenantSlug: string;
	productId: string;
	isPurchase?: boolean;
}

export const CartButton = ({ tenantSlug, productId, isPurchase }: Props) => {
	const cart = useCart(tenantSlug);

	if (isPurchase) {
		return (
			<Button
				variant="reverse"
				asChild
				className="flex-1 bg-white font-medium"
			>
				<Link href={`/library/${productId}`}>View in Library</Link>
			</Button>
		);
	}

	return (
		<Button
			variant="reverse"
			className={cn(
				'flex-1 bg-pink-400',
				cart.isProductInCart(productId) && 'bg-white',
			)}
			onClick={() => cart.toggleProduct(productId)}
		>
			{cart.isProductInCart(productId)
				? 'Remove from cart'
				: 'Add to cart'}
		</Button>
	);
};
