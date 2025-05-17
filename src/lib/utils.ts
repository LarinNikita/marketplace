import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// TODO Add subdomain in url
export function generateTenantUrl(tenantSlug: string) {
	return `/tenants/${tenantSlug}`;
}

export function formatCurrency(value: number | string) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(Number(value));
}
