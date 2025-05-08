import { CustomCategory } from '../types';
import { Categories } from './categories';
import { SearchInput } from './seacrh-input';

interface Props {
	data: CustomCategory[];
}

export const SearchFilters = ({ data }: Props) => {
	return (
		<div className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12">
			<SearchInput />
			<Categories data={data} />
		</div>
	);
};
