import Link from "next/link";
import { Redirect } from "next";
import { redirect } from "next/dist/server/api-utils";
import { RedirectType } from "next/navigation";


async function registrarUsuarioEnBaseDeDatos (usuario:string,contrasena:string) {
    console.log(`Guardando en la DB -> Usuario: ${usuario}, Clave:${contrasena}`);
  return { success: true };
}

export default function Registrarse(){
  return (
    <div id="registro" style={{ padding: '20px' }}>
      <h2>Crear una nueva cuenta</h2>
      <p>Completa los datos para registrarte en el sistema.</p>

      <form>
        <label htmlFor="usuario">Elige un nombre de usuario:</label>
        <br />
        <input type="text" name="usuario" id="usuario" required />
        <br /><br />

        <label htmlFor="contraseña">Elige una contraseña:</label>
        <br />
        <input type="password" name="contraseña" id="contraseña" required />
        <br /><br />

        <button type="submit">Registrarse y Crear Cuenta</button>
      </form>

      <br />
      <p>
        ¿Ya tienes cuenta? <Link href="/">Volver al Login</Link>
      </p>
    </div>
  );
}
