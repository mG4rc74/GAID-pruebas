import { createFileRoute, notFound } from "@tanstack/react-router";
import { getModule } from "@/lib/guide";
import { ModuleView } from "@/components/gaid/ModuleView";

export const Route = createFileRoute("/guia/$id")({
  loader: ({ params }) => {
    const m = getModule(params.id);
    if (!m) throw notFound();
    return { id: m.id, title: m.title, subtitle: m.subtitle, intro: m.intro };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} · ${loaderData.subtitle} — GAID` : "Apartado no disponible — GAID";
    const desc = loaderData?.intro.slice(0, 155) ?? "Guía de Acompañamiento Integral del Deceso.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { id } = Route.useLoaderData();
  const m = getModule(id);
  return m ? <ModuleView key={m.id} m={m} /> : null;
}
