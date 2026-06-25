import EventoDetalle from "@/app/components/eventoDetalle";
/**
 * pestaña donde los usuarios pueden ver un evento especifico por el id del evento.
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