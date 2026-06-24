"use client";

import {useEffect,useState} from "react";
import {getEventos} from "../services/eventos";
import {Evento} from "../types/entidades";
import Card from "./ui/card";
import cards from "../styles/cards.module.css";
import dashboard from "../styles/dashboard.module.css";

type Props={
 aulaId:number;
 nombre:string;
}

export default function InfoAula({aulaId, nombre}:Props){
    const [eventos,setEventos]=useState<Evento[]>([]);
    const [cargando,setCargando]=useState(true);
    const [error,setError]=useState("");
    
    useEffect(()=>{async function cargar(){
        try{
            const data:Evento[] =await getEventos();
            const filtrados = data.filter(ev => {

  return Number(ev.aula?.id_aula) === Number(aulaId);
});
            setEventos(filtrados);
        }
        catch(error){
          setError("No se pudieron cargar los eventos del aula.");
        }
        finally{
            setCargando(false);
        }
    }
    cargar();
},[aulaId]);
if(cargando){
  return (
    <Card className={dashboard.card}>
      <p>
        Cargando información del aula...
      </p>
    </Card>
  );
}


if(error){
  return (
    <Card className={dashboard.card}>
      <p className={dashboard.error}>
        {error}
      </p>
    </Card>
  );
}
const ahora = new Date();
const eventoActual =eventos.find(ev=>{
const inicio =new Date(`${ev.fecha}T${ev.horaInicio}`);
const fin =new Date(`${ev.fecha}T${ev.horaFin}`);

return ahora >= inicio &&
       ahora <= fin;});

const proximo = eventos.sort((a,b)=>
  new Date(`${b.fecha}T${b.horaInicio}`).getTime()
  -
  new Date(`${a.fecha}T${a.horaInicio}`).getTime()
)[0];
return (

<Card className={dashboard.card}>
  <div className={cards.cardHeader}>
    <h3>Aula {nombre}</h3>
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