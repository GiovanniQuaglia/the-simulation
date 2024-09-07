import { redirect } from 'next/navigation';

export const metadata = {
  title: "Reonic",
};

export default function Home() {
  redirect('/simulation');
}