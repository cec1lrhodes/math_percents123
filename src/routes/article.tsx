import { createFileRoute } from "@tanstack/react-router";
import ArticleMain from "../components/article/ArticleMain";

export const Route = createFileRoute("/article")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ArticleMain />
    </div>
  );
}
