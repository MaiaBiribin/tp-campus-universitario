import { render, screen, fireEvent } from "@testing-library/react";
import AcademicoAdmin from "@/app/dashboard/admin/academico/page";
import { useAsignacionAcademica } from "@/app/hooks/useAsignacionAcademica";
import { obtenerUsuariosDisponibles } from "@/app/services/usuarios";

jest.mock("@/app/hooks/useAsignacionAcademica", () => ({
  useAsignacionAcademica: jest.fn(),
}));
jest.mock("@/app/services/usuarios", () => ({
  obtenerUsuariosDisponibles: jest.fn(),
}));

jest.mock("@/app/components/ui/card", () => {
  return function Card({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div>{children}</div>;
  };
});

jest.mock("@/app/components/ui/button", () => {
  return function Button({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  };
});

const mockHook = useAsignacionAcademica as jest.Mock;
const mockDisponibles = obtenerUsuariosDisponibles as jest.Mock;

describe("AcademicoAdmin page", () => {
beforeEach(() => {
jest.clearAllMocks();
mockDisponibles.mockReturnValue([
  {
    id_usuario:1,
    nombre:"Juan",
    apellido:"Perez",
    dni:"123"
  }
]);
});

test("muestra cargando mientras carga",()=>{
mockHook.mockReturnValue({
  cargando:true
});
render(<AcademicoAdmin/>);
expect(
 screen.getByText(
 "Cargando información académica...")).toBeInTheDocument();
});

test("renderiza carreras y materias",()=>{
mockHook.mockReturnValue({
cargando:false,
carreras:[
 {
  id_carrera:1,
  nombre:"Ingeniería"
 }
],
materias:[
 {
  id_materia:10,
  nombre:"Programacion"
 }
],
usuarios:[],
usuariosInscriptos:[],
usuariosSeleccionados:[],
materiaSeleccionada:null,
error:"",
exito:"",
cambiarCarrera:jest.fn(),
cargarUsuariosInscriptos:jest.fn(),
toggleUsuario:jest.fn(),
inscribirUsuarios:jest.fn(),
setMateriaSeleccionada:jest.fn()
});
render(<AcademicoAdmin/>);
expect(screen.getByText("Ingeniería")).toBeInTheDocument();
expect(screen.getByText("Programacion")
).toBeInTheDocument();

});

test("cambia carrera al hacer click",()=>{

const cambiarCarrera =jest.fn();
mockHook.mockReturnValue({
cargando:false,
carreras:[
 {
 id_carrera:1,
 nombre:"Ingeniería"
 }
],
materias:[],
usuarios:[],
usuariosInscriptos:[],
usuariosSeleccionados:[],
materiaSeleccionada:null,

error:"",
exito:"",

cambiarCarrera,

cargarUsuariosInscriptos:jest.fn(),
toggleUsuario:jest.fn(),

inscribirUsuarios:jest.fn(),

setMateriaSeleccionada:jest.fn()
});
render(<AcademicoAdmin/>);
fireEvent.click(screen.getByText("Ingeniería"));
expect(cambiarCarrera).toHaveBeenCalledWith(1);
});

test("selecciona materia y carga usuarios inscriptos",()=>{
const setMateria =jest.fn();
const cargar =jest.fn();
mockHook.mockReturnValue({
cargando:false,
carreras:[],
materias:[
 {
 id_materia:5,
 nombre:"Matematica"
 }
],
usuarios:[],
usuariosInscriptos:[],
usuariosSeleccionados:[],
materiaSeleccionada:null,
error:"",
exito:"",
cambiarCarrera:jest.fn(),
cargarUsuariosInscriptos:cargar,
toggleUsuario:jest.fn(),
inscribirUsuarios:jest.fn(),
setMateriaSeleccionada:setMateria
});
render(<AcademicoAdmin/>);
fireEvent.click(
 screen.getByText("Matematica")
);
expect(setMateria).toHaveBeenCalledWith({
 id_materia:5,
 nombre:"Matematica"
});
expect(cargar).toHaveBeenCalledWith(5);
});

it("marca usuario y llama toggle",()=>{
const toggle =jest.fn();
mockHook.mockReturnValue({
cargando:false,
carreras:[],
materias:[
 {
 id_materia:1,
 nombre:"BD"
 }
],
usuarios:[
 {
 id_usuario:1,
 nombre:"Juan",
 apellido:"Perez",
 dni:"123"
 }
],
usuariosInscriptos:[],
usuariosSeleccionados:[],
materiaSeleccionada:{
 id_materia:1,
 nombre:"BD"
},
error:"",
exito:"",
cambiarCarrera:jest.fn(),
cargarUsuariosInscriptos:jest.fn(),
toggleUsuario:toggle,
inscribirUsuarios:jest.fn(),
setMateriaSeleccionada:jest.fn()
});
render(<AcademicoAdmin/>);
fireEvent.click(
 screen.getByRole("checkbox")
);
expect(toggle).toHaveBeenCalledWith(1);

});

test("inscribe usuarios seleccionados",()=>{
const inscribir =jest.fn();
mockHook.mockReturnValue({
cargando:false,
carreras:[],
materias:[],
usuarios:[],
usuariosInscriptos:[],
usuariosSeleccionados:[1],
materiaSeleccionada:{
 id_materia:20,
 nombre:"POO"
},
error:"",
exito:"",
cambiarCarrera:jest.fn(),
cargarUsuariosInscriptos:jest.fn(),
toggleUsuario:jest.fn(),
inscribirUsuarios:inscribir,
setMateriaSeleccionada:jest.fn()
});
render(<AcademicoAdmin/>);
fireEvent.click(
 screen.getByText(
 "Inscribir seleccionados"
 )
);


expect(inscribir).toHaveBeenCalledWith(20);});
it("muestra error",()=>{
mockHook.mockReturnValue({
cargando:false,
carreras:[],
materias:[],
usuarios:[],
usuariosInscriptos:[],
usuariosSeleccionados:[],
materiaSeleccionada:null,
error:"Error de prueba",
exito:"",
cambiarCarrera:jest.fn(),
cargarUsuariosInscriptos:jest.fn(),
toggleUsuario:jest.fn(),
inscribirUsuarios:jest.fn(),
setMateriaSeleccionada:jest.fn()
});

render(<AcademicoAdmin/>);
expect(screen.getByText("Error de prueba")).toBeInTheDocument();
});

test("muestra mensaje de exito",()=>{
mockHook.mockReturnValue({
cargando:false,
carreras:[],
materias:[],
usuarios:[],
usuariosInscriptos:[],
usuariosSeleccionados:[],
materiaSeleccionada:null,
error:"",
exito:"Usuario inscripto correctamente",
cambiarCarrera:jest.fn(),
cargarUsuariosInscriptos:jest.fn(),
toggleUsuario:jest.fn(),
inscribirUsuarios:jest.fn(),
setMateriaSeleccionada:jest.fn()
});
render(<AcademicoAdmin/>);
expect(screen.getByText("Usuario inscripto correctamente")).toBeInTheDocument();
});
});