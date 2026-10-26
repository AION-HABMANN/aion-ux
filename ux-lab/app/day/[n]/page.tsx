import { DayView } from "@/components/day/DayView";

export function generateStaticParams() {
  return Array.from({ length: 16 }, (_, i) => ({ n: String(i + 1) }));
}
export const metadata = { title: "Day · Neuro-UX Lab" };

export default function Page({ params }: { params: { n: string } }) {
  return <DayView n={Number(params.n)} part="home" />;
}
