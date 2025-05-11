'use client';

import { useState } from 'react';

import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

import { useProductFilters } from '../../hooks/use-product-filters';

import { cn } from '@/lib/utils';

import { PriceFilter } from './price-filter';

interface ProductFilterProps {
	title: string;
	className?: string;
	children: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

	return (
		<div className={cn('flex flex-col gap-2 border-b p-4')}>
			<div
				onClick={() => setIsOpen((current) => !current)}
				className="flex cursor-pointer items-center justify-between"
			>
				<p className="font-medium">{title}</p>
				<Icon className="size-5" />
			</div>
			{isOpen && children}
		</div>
	);
};

export const ProductFilters = () => {
	const [filters, setFilters] = useProductFilters();

	const hasAnyFilters = Object.entries(filters).some(([_, value]) => {
		if (typeof value === 'string') {
			return value !== '';
		}

		return value !== null;
	});

	const onClear = () => {
		setFilters({
			minPrice: '',
			maxPrice: '',
		});
	};

	const onChange = (key: keyof typeof filters, value: unknown) => {
		setFilters({ ...filters, [key]: value });
	};

	return (
		<div className="rounded-md border bg-white">
			<div className="flex items-center justify-between border-b p-4">
				<p className="font-medium">Filters</p>
				{hasAnyFilters && (
					<button
						className="cursor-pointer underline"
						onClick={() => onClear()}
						type="button"
					>
						Clear
					</button>
				)}
			</div>
			<ProductFilter title="Price">
				<PriceFilter
					minPrice={filters.minPrice}
					maxPrice={filters.maxPrice}
					onMinPriceChange={(value) => onChange('minPrice', value)}
					onMaxPriceChange={(value) => onChange('maxPrice', value)}
				/>
			</ProductFilter>
		</div>
	);
};
