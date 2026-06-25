import { render, screen} from "@testing-library/react";
import Notificaciones from "@/app/dashboard/estudiante/notificaciones/page";
import RenderizarNotifiaciones from "@/app/components/renderizarNotificaciones";

jest.mock("@/app/components/renderizarNotificaciones",()=>{
    return function mockRenderizarNotificaciones(){
        return <div data-testId="mock-renderizar-notificaciones">Lista de notificaciones</div>
    };
});

describe("notificaciones del estudiante",()=>{
     it("poder renderizar la pagina con las notificaciones pendientes del usuario",()=>{

        render(<Notificaciones/>)

        expect(screen.getByRole("main")).toBeInTheDocument()
        expect(screen.getByRole("heading",{level:1,name:/Notificaciones/i})).toBeInTheDocument

        const mockNotificaciones=screen.getByTestId("mock-renderizar-notificaciones")
        expect(mockNotificaciones).toBeInTheDocument()
        expect(screen.getByText("Lista de notificaciones")).toBeInTheDocument()


     })
})