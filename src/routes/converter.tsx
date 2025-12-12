import { createFileRoute } from "@tanstack/react-router";
import Converter from "../components/Converter";

export const Route = createFileRoute("/converter")({
  component: ConverterPage,
});

function ConverterPage() {
  return <Converter />;
}
