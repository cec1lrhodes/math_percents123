import { createFileRoute } from "@tanstack/react-router";
import Percents from "../components/Percents";

export const Route = createFileRoute("/percents")({
  component: PercentsPage,
});

function PercentsPage() {
  return <Percents />;
}
