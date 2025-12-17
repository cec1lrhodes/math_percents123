import { createFileRoute } from "@tanstack/react-router";
import NewsComponent from "../components/NEWS/NewsComponent";

export const Route = createFileRoute("/news")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <NewsComponent />
    </div>
  );
}
