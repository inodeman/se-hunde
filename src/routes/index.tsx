import { createFileRoute } from "@tanstack/react-router";
import { WatchPage } from "@/components/watch-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <WatchPage />;
}
