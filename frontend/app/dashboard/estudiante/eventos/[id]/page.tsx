import EventoDetalle from "@/app/components/eventoDetalle";

export default async function Page({params,}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =await params;

  return (
    <EventoDetalle
      id={Number(id)}
    />
  );
}