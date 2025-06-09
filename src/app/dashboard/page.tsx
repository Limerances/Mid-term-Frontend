import { redirect } from 'next/navigation';

export default function Page(): never {
    redirect('/dashboard/home');
//   redirect('/dashboard/part1/sub1');
//   redirect('/dashboard/research1/sub1');
}
