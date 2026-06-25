"use client";

import { useEffect,useState } from "react";
import { Evento } from "../types/entidades";

import { getEventos } from "../services/eventos";
import { crearAviso } from "../services/avisos";

import forms from "@/app/styles/forms.module.css";
import Button from "@/app/components/ui/button";
import Card from "@/app/components/ui/card";

/**
 * Crea un nuevo aviso asociado a un evento.
 * Obtiene los eventos futuros disponibles, permite seleccionar uno y enviar un mensaje que será registrado como aviso.
 * Gestiona estados de carga, validación, éxito y error mediante mensajes visibles en pantalla.
 * @component
 * @returns {JSX.Element} Formulario para crear avisos.
 * @example
 * <CrearAviso />
 */
export default function CrearAviso(){
const [eventos,setEventos] =useState<Evento[]>([]);
const [idEvento,setIdEvento] =useState("");
const [mensaje,setMensaje] =useState("");
const [cargando,setCargando] =useState(true);
const [guardando,setGuardando] = useState(false);
const [error,setError] = useState("");
const [exito,setExito] = useState("");

useEffect(()=>{

async function cargar(){
    try{
        const data = await getEventos();
        const futuros = data.filter((ev:Evento)=>{
            const fecha =new Date(`${ev.fecha}T${ev.horaInicio}`);
            return fecha >= new Date();}).sort((a:Evento,b:Evento)=>{
                const fechaA =new Date(
                    `${a.fecha}T${a.horaInicio}`).getTime();
            const fechaB =new Date(`${b.fecha}T${b.horaInicio}`).getTime();
            return fechaA-fechaB;
        });
        setEventos(futuros);
    }catch{
    setError("No se pudieron cargar los eventos.");}
finally{
    setCargando(false);
}
}
cargar();},[]);
async function handleSubmit(e:React.FormEvent){
  e.preventDefault();
  setError("");
  setExito("");
  if(!idEvento){
    setError("Seleccioná un evento.");
    return;
  }
  if(!mensaje.trim()){
    setError("Escribí un mensaje.");
    return;
  }
  setGuardando(true);
  try{
    await crearAviso(
      mensaje,
      Number(idEvento)
    );
    setExito("Aviso creado correctamente.");
    setMensaje("");
    setIdEvento("");
  }catch{
    setError("No se pudo crear el aviso."
    );

  }finally{
    setGuardando(false);
  }
}
if(cargando)
return (
  <p className={forms.helper}>Cargando eventos...</p>);
    return (
    <Card>
        <form
        onSubmit={handleSubmit}
        className={forms.form}
        >
            {error && (
        <p className={forms.error}>
          {error}
        </p>
      )}

      {exito && (
        <p className={forms.helper}>
          {exito}
        </p>
      )}
            <div className={forms.row}>
            <div className={forms.field}>
                <label className={forms.label}>
                    Evento
                </label>
                <select
                className={forms.select}
                value={idEvento}
                onChange={
                    e=>setIdEvento(e.target.value)
                    }
                >
                    <option value="">
                        Seleccionar evento
                    </option>
                    {eventos.map(ev=>(
                    <option
                    key={ev.id_evento}
                    value={ev.id_evento}
                    >
                        {ev.titulo}
                        {" - "}
                        {ev.fecha}
                        {" - "}
                        {ev.horaInicio}
                    </option>
                ))
                }
                </select>
                </div>
                </div>
                <div className={forms.row}>
                    <div className={forms.field}>
                        <label className={forms.label}>Mensaje</label>
                        <textarea
                        className={forms.input}
                        value={mensaje}
                        onChange={e=>setMensaje(e.target.value)}
                        placeholder="Escribí el aviso..."
                        rows={5}/>
            </div>
            </div>
            <div className={forms.actions}>
                <Button type="submit">Crear aviso</Button>
            </div>
        </form>
    </Card>
    );
}