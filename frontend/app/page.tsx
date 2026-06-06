"use client";

import Link from "next/link";


export default function Home(){
  

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden p-8 flex flex-col justify-between font-sans antialiased">

      <div ></div>

      <main className="relative flex flex-col grow justify-between">
          <header className="flex justify-between items-start w-full">
            <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight">Bienvenido a Aulasync</h1>
          </div>
          <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 text-sm max-w-sm backdrop-blur-md text-slate-300 shadow-xl">
          <p className="leading-relaxed">
           Los usuarios deben ser aprobados por un administrador antes de ingresar al sistema.
           </p>
         
          </div>
          </header>
       
         <section className="flex flex-col items-center text-center my-auto py-20">
         <h2 className="text-7xl font-extrabold mb-3 tracking-tighter leading-tight">
         <span className="text-violet-400">AulaSync</span> 
         </h2>
         <p>Organizando aulas, optimizando tiempos</p>
         <div className="w-28 h-1 bg-violet-500 mt-6 rounded-full"/>
           </section>

     <footer className="flex flex-col items-center gap-10 mt-auto">
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        
        <div className="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl text-center">
          <h3 className="font-semibold text-lg mb-2">
                Gestión de eventos
              </h3>
          <p className="text-sm text-slate-400">
                Organizá y asigná eventos académicos
              </p>
          </div>
          
          <div className="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl text-center">
              <h3 className="font-semibold text-lg mb-2">
                Aulas disponibles
              </h3>

              <p className="text-sm text-slate-400">
                Asignación inteligente sin conflictos horarios
              </p>
            </div>
           
          <div className="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl text-center">
              <h3 className="font-semibold text-lg mb-2">
                Notificaciones
              </h3>

              <p className="text-sm text-slate-400">
                Enterate de cambios y avisos importantes
              </p>
            </div>
          
          <div className="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl text-center">
              <h3 className="font-semibold text-lg mb-2">
                Para todos
              </h3>

              <p className="text-sm text-slate-400">
                Estudiantes, docentes y administradores
              </p>
            </div>
        </div>
    
         
          <Link
            href="/login"
            className="
            flex
            items-center
            justify-center
            min-w-[220px]
            h-14
            bg-gradient-to-r
            from-violet-600
            to-indigo-600
            rounded-xl
            font-semibold
            text-lg
            text-white
            shadow-lg
            hover:scale-105
            "
          >
            Ingresar
          </Link>
   

      </footer>
    
      </main>
    </div>
  )
}