'use client';

import { useState } from 'react';

import { StarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
	value?: number;
	onChange?: (value: number) => void;
	disabled?: boolean;
}

export const StarPicker = ({ value = 0, onChange, disabled }: Props) => {
	const [hoverValue, setHoverValue] = useState(0);

	return (
		<div
			className={cn(
				'flex items-center',
				disabled && 'cursor-not-allowed opacity-50',
			)}
		>
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					key={star}
					type="button"
					disabled={disabled}
					className={cn(
						'p-0.5 transition hover:scale-110',
						!disabled && 'cursor-pointer',
					)}
					onClick={() => onChange?.(star)}
					onMouseEnter={() => setHoverValue(star)}
					onMouseLeave={() => setHoverValue(0)}
				>
					<StarIcon
						className={cn(
							'size-5',
							(hoverValue || value) >= star
								? 'fill-black stroke-black'
								: 'stroke-black',
						)}
					/>
				</button>
			))}
		</div>
	);
};
