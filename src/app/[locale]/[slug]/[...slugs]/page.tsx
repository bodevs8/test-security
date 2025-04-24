import { RouterPathEnum } from '@/enums';
import { redirect } from 'next/navigation';

export default async function GameCategory() {
  return redirect(RouterPathEnum.NotFound);
}
