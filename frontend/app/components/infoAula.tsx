"use client";

import {useEffect,useState} from "react";
import {getEventos} from "../services/eventos";
import {getAulas} from "../services/aulas";
import {Evento, Aula} from "../types/entidades";
import Card from "./ui/card";
import cards from "../styles/cards.module.css";
import dashboard from "../styles/dashboard.module.css";

type Props={
 aulaId:number;
 nombre:string;
}

/**
 * Muestra información dinámica de un aula.
 * Consulta los eventos disponibles y determina el estado del aula:
 * ocupada si existe un evento en curso, libre si tiene eventos futuros
 * o sin eventos si no posee actividades programadas.
 * @component
 * @param {Props} props - Datos del aula.
 * @param {number} props.aulaId - Identificador del aula.
 * @param {string} props.nombre - Nombre visible del aula.
 * @returns {JSX.Element} Información del aula renderizada.
 * @example
 * <InfoAula aulaId={13} nombre="101" />
 */
export default function InfoAula({aulaId, nombre}:Props){
    const [eventos,setEventos]=useState<Evento[]>([]);
    const [cargando,setCargando]=useState(true);
    const [error,setError]=useState("");
    const [capacidad,setCapacidad]=useState(0);
    
    useEffect(()=>{async function cargar(){
        try{
            const data:Evento[] =await getEventos();
            const aulas:Aula[] = await getAulas();
            const aula =aulas.find(a=>a.id_aula===aulaId);
            if(aula){
              setCapacidad(aula.capacidad);
            }
            const filtrados = data.filter(ev => {
              return Number(ev.aula?.id_aula) === Number(aulaId);});
            setEventos(filtrados);
          }catch(error){
            setError("No se pudieron cargar los eventos del aula.");
          }finally{
            setCargando(false);
          }
    }
    cargar();
  },[aulaId]);
  if(cargando){
    return (<Card className={dashboard.card}><p>Cargando información del aula...</p></Card>);
  }
  if(error){
    return (<Card className={dashboard.card}><p className={dashboard.error}>{error}</p></Card>);
  }
  const ahora = new Date();
  const eventoActual =eventos.find(ev=>{
    const inicio =new Date(`${ev.fecha}T${ev.horaInicio}`);
    const fin =new Date(`${ev.fecha}T${ev.horaFin}`);
  return ahora >= inicio &&ahora <= fin;});
  const proximo = eventos.filter(ev=>{const inicio =new Date(`${ev.fecha}T${ev.horaInicio}`);
  return inicio > ahora;
})
.sort((a,b)=>
  new Date(`${a.fecha}T${a.horaInicio}`).getTime()
  -
  new Date(`${b.fecha}T${b.horaInicio}`).getTime()
)[0];
return (

<Card className={dashboard.card}>
  <div className={cards.cardHeader}>
    <h3>Aula {nombre}</h3>
    <p>🪑 Capacidad: {capacidad} personas</p>
  </div>
  {
    eventoActual ? (
      <div>
        <p>
          🔴 Aula ocupada
        </p>
        <h4>
          {eventoActual.titulo}
        </h4>
        <p>
          📅 {eventoActual.fecha}
        </p>
        <p>
          🕒 {eventoActual.horaInicio}
          {" - "}
          {eventoActual.horaFin}
        </p>
      </div>
    )
    :
    proximo ? (
      <div>
        <p>
          🟢 Aula libre actualmente
        </p>
        <h4>
          Próximo evento
        </h4>
        <p>
          {proximo.titulo}
        </p>
        <p>
          📅 {proximo.fecha}
        </p>
        <p>
          🕒 {proximo.horaInicio}
        </p>
      </div>
    )
    :
    (
      <p>
        🟢 No hay eventos programados
      </p>
    )
  }
</Card>
);}