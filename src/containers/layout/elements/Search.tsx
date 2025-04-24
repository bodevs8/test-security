'use client';

import { SearchInput } from '@/components/BaseInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const searchSchema = z.object({
  search: z.string(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

type Props = {
  initialValue?: string;
  onFocus?: () => void;
  onSearch?: (value: string) => void;
};

export const Search = ({ onFocus, onSearch, initialValue }: Props) => {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: initialValue || '',
    },
  });

  useEffect(() => {
    form.setValue('search', initialValue || '');
  }, [initialValue, form]);

  const onSubmit = (data: SearchFormValues) => {
    onSearch?.(data.search);
  };

  return (
    <div className="absolute right-0 top-0 flex h-full items-center lg:relative lg:ml-auto">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative xl:w-[220px] 2xl:w-[298px]"
      >
        <SearchInput
          name="search"
          control={form.control}
          placeholder="Tìm Kiếm Trò Chơi"
          className="h-[40px]"
          inputClassName="text-[14px] font-medium"
          enableSpace
          onFocus={() => onFocus?.()}
        />
      </form>
    </div>
  );
};
