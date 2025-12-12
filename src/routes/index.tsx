import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Ласкаво просимо!
        </h1>
        <p className="text-gray-600 text-lg">Оберіть інструмент з меню зліва</p>
      </div>
    </div>
  );
}
