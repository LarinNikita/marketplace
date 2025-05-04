import Link from 'next/link';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';

interface NavbarItem {
	href: string;
	children: React.ReactNode;
}

interface NavbarSidebar {
	items: NavbarItem[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: NavbarSidebar) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="left"
				className="bg-secondary-background p-0 transition-none"
			>
				<SheetHeader className="border-b p-4">
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
					{items.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
							onClick={() => onOpenChange(false)}
						>
							{item.children}
						</Link>
					))}
					<div className="border-t">
						<Link
							href="/sign-in"
							className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
							onClick={() => onOpenChange(false)}
						>
							Log in
						</Link>
						<Link
							href="/sign-up"
							className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
							onClick={() => onOpenChange(false)}
						>
							Start selling
						</Link>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};
