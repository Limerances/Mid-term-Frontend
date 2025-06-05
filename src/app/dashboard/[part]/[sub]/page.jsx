'use client';

import { useParams } from 'next/navigation';
import PageContent from '@/components/page/PageContent';

export default function Page() {
  const { part, sub } = useParams(); // 获取URL中的 part 和 sub，比如 part1, sub1
  const pageName = `${part}_${sub}`; // 拼成一个 key：如 part1_sub1

  return <PageContent pageName={pageName} />;
}
