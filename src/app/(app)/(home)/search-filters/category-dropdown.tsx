'use client';

import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { CustomCategory } from '../types';
import { SubcategoryMenu } from './subcategory-menu';
import { useDropdownPosition } from './use-dropdown-position';

import { Button } from '@/components/ui/button';

interface Props {
	category: CustomCategory;
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

	return (
		<div
			className="relative"
			ref={dropdownRef}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className="relative">
				<Button
					variant="reverse"
					className={cn(
						'h-11 rounded-full border border-transparent bg-transparent px-4 hover:border-black',
						isActive &&
							!isNavigationHovered &&
							'border-main bg-white',
						isOpen &&
							'shadow-shadow translate-x-reverseBoxShadowX translate-y-reverseBoxShadowY border-black bg-white',
					)}
				>
					{category.name}
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
