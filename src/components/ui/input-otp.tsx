'use client';

import * as React from 'react';

import { Dot } from 'lucide-react';
import { OTPInput, OTPInputContext } from 'input-otp';

import { cn } from '@/lib/utils';

function InputOTP({
	className,
	containerClassName,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string;
}) {
	return (
		<OTPInput
			data-slot="input-otp"
			containerClassName={cn(
				'flex items-center gap-2 has-disabled:opacity-50',
				containerClassName,
			)}
			className={cn('disabled:cursor-not-allowed', className)}
			{...props}
		/>
	);
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn('flex items-center', className)}
			{...props}
		/>
	);
}

function InputOTPSlot({
	index,
	className,
	...props
}: React.ComponentProps<'div'> & { index: number }) {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } =
		inputOTPContext?.slots[index] ?? {};

	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			className={cn(
				'border-border bg-secondary-background font-base text-foreground first:rounded-l-base last:rounded-r-base relative flex size-10 items-center justify-center border-y-2 border-r-2 text-sm transition-all first:border-l-2',
				isActive && 'ring-ring z-10 ring-1',
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="animate-caret-blink h-4 w-px bg-current duration-1000" />
				</div>
			)}
		</div>
	);
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
	return (
		<div data-slot="input-otp-separator" role="separator" {...props}>
			<Dot className="size-4" />
		</div>
	);
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
