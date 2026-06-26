import EventoDetalle from "@/app/components/eventoDetalle";
/**
 * Visualización de un evento específico por el id de evento.
 * @param {Promise<evento>} params 
 * @returns {JSX.Element} vista del evento particular
 */
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