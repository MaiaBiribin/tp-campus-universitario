"use client";
import {getUsuariosPendientes,aprobarUsuario,rechazarUsuario}
from "@/app/services/usuarios";
import { JSX, useEffect, useState } from "react";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import { Solicitud } from "../../../types/entidades";
import styles from "./page.module.css";
import Card from "@/app/components/ui/card";
import Button from "@/app/components/ui/button";
import forms from "@/app/styles/forms.module.css";
/**
 * panel de solicitudes del admin
 * muestra al admin las solicitudes de los nuevos usuarios que esperan ser habilitados
 * @returns {JSX.Element} 
 */
export default function SolicitudesAdmin() {

  const [solicitudes, setSolicitudes] =useState<Solicitud[]>([]);
  const [cargando, setCargando] =useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
 /**
  * funcion que carga las solicitudes pendientes
  *  @throws en el caso que no se pudo cargar las solicitudes.
  */
  async function cargarSolicitudes() {
    try {
      setError("");
      const data = await getUsuariosPendientes();
      setSolicitudes(data);
    } catch (error) {
      setError("No se pudieron cargar las solicitudes.");
    } finally {
      setCargando(false);
    }
  }
  cargarSolicitudes();}, []);
/**
 * funcion para poder aprobar un usuario en especifico y cambiarle el estado a habilitado.
 * @param {number} id  id del usario que se quiera aprobar.
 * @throws en el caso que no se pudo aprobar el usuario.
 */
  async function aprobar(id: number) {
    try {
      setError("");
      await aprobarUsuario(id);
      setSolicitudes((prev) =>
      prev.filter(
        (u) => u.id_usuario !== id
      ));
    } catch (error) {
      setError("No se pudo aprobar la solicitud.");
    }
  }
 /**
  * funcion para poder recharzar la solicitud de un usario
  * @param {number} id el id del usuario cuya solicitud se rechazo
  *  @throws en el caso que no se pudo rechazar la solicitud.
  */
  async function rechazar(id: number) {
    try {
      setError("");
      await rechazarUsuario(id);
      setSolicitudes((prev) =>
      prev.filter(
        (u) => u.id_usuario !== id));
  } catch (error) {
    setError("No se pudo rechazar la solicitud.");
  }

}

  if (cargando) {
    return (
      <main className={layout.main}>
        <div className={layout.content}>
          <h1>Cargando solicitudes...</h1>
        </div>
      </main>
    );
  }

return (
  <main
    className={
      layout.main
    }
  >
    <div
      className={
        layout.content
      }
    >
      <header
        className={
          dashboard.header
        }
      >
        <div>
          <h1>Solicitudes de registro</h1>
          <p>
            Revisá solicitudes pendientes
            y aprobá únicamente usuarios
            autorizados.
          </p>
        </div>
        <div className={styles.counter}>
          {solicitudes.length}
        </div>
      </header>
      {error && (<p role="alert" className={forms.error}>⚠️ {error}</p>)}
      <section>
        {
          solicitudes.length === 0 ? (
            <Card>
              <div
                className={
                  styles.empty
                }
              >
                <h2>No hay solicitudes pendientes</h2>
                <p>
                  Cuando un usuario se registre
                  aparecerá acá.
                </p>
              </div>
            </Card>
          ) : (
            <div
              className={
                styles.grid
              }
            >
              {
                solicitudes.map(
                  (usuario) => (
                    <Card
                      key={
                        usuario.id_usuario
                      }
                    >
                      <div
                        className={
                          styles.user
                        }
                      >
                        <div
                          className={
                            styles.avatar
                          }
                        >
                          {
                            usuario.nombre[0]
                          }
                        </div>
                        <div>
                          <h2>
                            {
                              usuario.nombre
                            }{" "}
                            {
                              usuario.apellido
                            }
                          </h2>
                          <p>
                            {
                              usuario.mail
                            }
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          styles.data
                        }
                      >
                        <div>
                          <span>
                            DNI
                          </span>
                          <strong>
                            {
                              usuario.dni
                            }
                          </strong>
                        </div>
                        <div>
                          <span>
                            Estado
                          </span>
                          <strong
                            className={
                              styles.pending
                            }
                          >
                            Pendiente
                          </strong>
                        </div>
                      </div>
                      <div
                        className={
                          styles.actions
                        }
                      >
                        <Button
                          onClick={
                            () =>
                              aprobar(
                                usuario.id_usuario
                              )
                          }
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={
                            () =>
                              rechazar(
                                usuario.id_usuario
                              )
                          }
                        >
                          Rechazar
                        </Button>
                      </div>
                    </Card>
                  )
                )
              }
            </div>
          )
        }
      </section>
    </div>
  </main>
);
}