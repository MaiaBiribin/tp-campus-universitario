"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { getAvisoById, editarAviso } from "../services/avisos";
import forms from "@/app/styles/forms.module.css";
import Button from "@/app/components/ui/button";
import Card from "@/app/components/ui/card";

type Props = {
  idAviso:number;
};

/**
 * Formulario para editar un aviso existente.
 * @param {Props} props Propiedades del componente.
 * @param {number} props.idAviso Identificador del aviso.
 * @returns {JSX.Element} Formulario de edición del aviso.
 */
export default function EditarAviso({idAviso,}:Props){

  const router = useRouter();
  const [mensaje,setMensaje] = useState("");
  const [cargando,setCargando] = useState(true);
  const [guardando,setGuardando] = useState(false);
  const [error,setError] = useState("");
  const [exito,setExito] = useState("");

  useEffect(()=>{
    /**
     * Obtiene el aviso y carga su mensaje en el formulario.
     * @returns {Promise<void>}
     * */
    async function cargar(){
      try{
        const aviso =await getAvisoById(idAviso);
        setMensaje(aviso.mensaje);
      }catch{
        setError("No se pudo cargar el aviso.");
      }finally{
        setCargando(false);
      }
    }
    cargar();
  },[idAviso]);
  /**
  * Envía la actualización del aviso.
  * @param {React.FormEvent} e Evento de envío del formulario.
  * @returns {Promise<void>}
  */
  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    setError("");
    setExito("");

    if(!mensaje.trim()){
      setError("Escribí un mensaje.");

      return;
    }
    setGuardando(true);

    try{
      await editarAviso(idAviso,mensaje);

      setExito("Aviso actualizado correctamente.");

      setTimeout(()=>{
        router.push(
          "/dashboard/docente/avisos"
        );
      },1000);

    }catch{
      setError("No se pudo actualizar el aviso.");
    }finally{
      setGuardando(false);
    }
  }

  if(cargando){
    return (
      <p className={forms.helper}>
        Cargando aviso...
      </p>
    );
  }

  return(
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
            <label
              className={forms.label}
            >
              Mensaje
            </label>
            <textarea
              className={forms.input}
              value={mensaje}
              rows={5}
              onChange={e =>
                setMensaje(
                  e.target.value
                )
              }
            />
          </div>
        </div>
        <div className={forms.actions}>
          <Button
            type="submit"
            disabled={guardando}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </Card>
  );
}