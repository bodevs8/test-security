'use client';

import { SearchInput } from '@/components/BaseInput/SearchInput';
import { useSearchForm } from '@/hooks/utils';

export const Search = () => {
  const { form, onSubmit } = useSearchForm();

  return (
    <div className="absolute right-0 top-0 flex h-full items-center lg:relative lg:ml-auto">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-[100px] 2xl:w-[200px]"
      >
        <SearchInput
          name="search"
          control={form.control}
          placeholder="Tìm kiếm trò chơi..."
          className="h-[40px]"
        />
      </form>
    </div>
  );
};
