"use client";

import layout from "@/app/styles/layout.module.css";
import forms from "@/app/styles/forms.module.css";
import Card from "@/app/components/ui/card";
import Button from "@/app/components/ui/button";
import dashboard from "@/app/styles/dashboard.module.css";
import { useCrearEvento } from "@/app/hooks/useCrearEvento";
export default function CrearEvento() {
  const evento =useCrearEvento();
  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    const ok =await evento.submit();
    if(ok){
      setTimeout(()=>{
        window.location.href="/dashboard/admin/eventos";
      },1500);
    }
  }
  return (
  <main className={layout.main}>
    <div className={layout.content}>
      <header className={dashboard.header}>
        <h1>
          Crear evento
        </h1>
        <p>
          Registrá una clase,
          parcial o final.
        </p>
      </header>
      <Card>
        <form
          onSubmit={handleSubmit}
          className={forms.form}
        >
          {evento.error && (<p className={forms.error}>{evento.error}</p>)}
          <div className={forms.row}>
            <div className={forms.field}>
              <label className={forms.label}>
                Carrera
              </label>
              <select
                className={forms.select}
                value={evento.idCarrera}
                onChange={(e) =>
                  evento.cambiarCarrera(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Seleccionar carrera
                </option>
                {evento.carreras.map(
                  (carrera) => (
                    <option
                      key={carrera.id_carrera}
                      value={carrera.id_carrera}
                    >
                      {carrera.nombre}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className={forms.field}>
              <label className={forms.label}>
                Materia
              </label>
              <select
                className={forms.select}
                value={evento.idMateria}
                onChange={(e) =>
                  evento.setIdMateria(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Seleccionar materia
                </option>
                {evento.materias.map(
                  (materia) => (
                    <option
                      key={materia.id_materia}
                      value={materia.id_materia}
                    >
                      {materia.nombre}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className={forms.row}>
            <div className={forms.field}>
              <label className={forms.label}>
                Tipo de evento
              </label>
              <select
                className={forms.select}
                value={evento.idTipoEvento}
                onChange={(e) =>
                  evento.setIdTipoEvento(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Seleccionar tipo
                </option>
                <option value="1">
                  Clase
                </option>
                <option value="2">
                  Parcial
                </option>
                <option value="3">
                  Final
                </option>
              </select>
            </div>
            <div className={forms.field}>
              <label className={forms.label}>
                Aula
              </label>
              <select
                className={forms.select}
                value={evento.idAula}
                onChange={(e) =>
                  evento.setIdAula(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Seleccionar aula
                </option>
                {evento.aulas.map(
                  (aula) => (
                    <option
                      key={aula.id_aula}
                      value={aula.id_aula}
                    >
                      {aula.nombre}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className={forms.row}>
            <div className={forms.field}>
              <label className={forms.label}>
                Fecha
              </label>
              <input
                type="date"
                className={forms.input}
                value={evento.fecha}
                onChange={(e) =>
                  evento.setFecha(
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          <div className={forms.row}>
            <div className={forms.field}>
              <label className={forms.label}>
                Hora inicio
              </label>
              <input
                type="time"
                className={forms.input}
                value={evento.horaInicio}
                onChange={(e) =>
                  evento.setHoraInicio(
                    e.target.value
                  )
                }
              />
            </div>
            <div className={forms.field}>
              <label className={forms.label}>
                Hora fin
              </label>
              <input
                type="time"
                className={forms.input}
                value={evento.horaFin}
                onChange={(e) =>
                  evento.setHoraFin(
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          <div className={forms.actions}>
            <Button
              type="submit"
            >
              Crear evento
            </Button>
          </div>
        </form>
      </Card>
    </div>
  </main>
);
}