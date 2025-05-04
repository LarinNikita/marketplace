'use client';

import * as React from 'react';

import { Circle } from 'lucide-react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

function RadioGroup({
	className,
	...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
	return (
		<RadioGroupPrimitive.Root
			data-slot="radio-group"
			className={cn('grid gap-2', className)}
			{...props}
		/>
	);
}

function RadioGroupItem({
	className,
	...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
	return (
		<RadioGroupPrimitive.Item
			data-slot="radio-group-item"
			className={cn(
				'border-border focus-visible:ring-ring aspect-square size-4 rounded-full border-2 text-black focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white',
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<Circle className="size-2 fill-current text-current" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
}

export { RadioGroup, RadioGroupItem };
