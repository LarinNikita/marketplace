'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { CategoriesGetManyOutput } from '@/modules/categories/types';

import { SubcategoryMenu } from './subcategory-menu';
import { useDropdownPosition } from './use-dropdown-position';

import { Button } from '@/components/ui/button';

interface Props {
	category: CategoriesGetManyOutput[1];
	isActive?: boolean;
	isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
	category,
	isActive,
	isNavigationHovered,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { getDropdownPosition } = useDropdownPosition(dropdownRef);

	const onMouseEnter = () => {
		if (category.subcategories) {
			setIsOpen(true);
		}
	};

	const onMouseLeave = () => setIsOpen(false);

	const dropdownPosition = getDropdownPosition();

	// TODO Potential improve mobile
	// const toggleDropdown = () => {
	// 	if (category.subcategories?.docs?.length) {
	// 		setIsOpen(!isOpen);
	// 	}
	// };

	return (
		<div
			className="relative"
			ref={dropdownRef}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			// onClick={toggleDropdown}
		>
			<div className="relative">
				<Button
					asChild
					variant="reverse"
					className={cn(
						'h-11 rounded-full border border-transparent bg-transparent px-4 hover:border-black',
						isActive &&
							!isNavigationHovered &&
							'border-black bg-white',
						isOpen &&
							'shadow-shadow translate-x-reverseBoxShadowX translate-y-reverseBoxShadowY border-black bg-white',
					)}
				>
					<Link
						// prefetch // TODO maybe improve this
						href={`/${category.slug === 'all' ? '' : category.slug}`}
					>
						{category.name}
					</Link>
				</Button>
				{category.subcategories &&
					category.subcategories.length > 0 && (
						// ▲ element
						<div
							className={cn(
								'absolute -bottom-3 left-1/2 size-0 -translate-x-1/2 border-r-[10px] border-b-[10px] border-l-[10px] border-r-transparent border-b-black border-l-transparent opacity-0',
								isOpen && 'opacity-100',
							)}
						/>
					)}
			</div>
			<SubcategoryMenu
				category={category}
				isOpen={isOpen}
				position={dropdownPosition}
			/>
		</div>
	);
};
