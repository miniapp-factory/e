import { Quiz } from "../components/quiz";
import { generateMetadata } from "@/lib/farcaster-embed";

export { generateMetadata };

export default function Home() {
  return (
    <main className="flex flex-col gap-3 place-items-center px-4">
      <Quiz />
    </main>
  );
}
