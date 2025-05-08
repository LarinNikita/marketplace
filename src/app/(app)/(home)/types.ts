import { Category } from '@/payload-types';

// TODO Refactor types
export type CustomCategory = Category & {
	subcategories: Category[];
};
