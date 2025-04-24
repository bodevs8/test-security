import type { SearchFormValues } from '@/containers/layout/elements/Search/types';
import { searchSchema } from '@/schemas/search-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useSearchForm = () => {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = () => {
    // TODO: Handle search
  };

  return {
    form,
    onSubmit,
  };
};
