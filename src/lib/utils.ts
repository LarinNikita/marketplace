import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// TODO Add subdomain in url
export function generateTenantUrl(tenantSlug: string) {
	return `/tenants/${tenantSlug}`;
}
