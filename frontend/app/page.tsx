
"use client";

import Link from "next/link";


export default function Home(){
  

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden p-8 flex flex-col justify-between font-sans antialiased">

      <div ></div>

      <main className="relative flex flex-col grow justify-between">
          <header className="flex justify-between items-start w-full">
            <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight">Bienvenido a AulaAsync</h1>
          </div>
          <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 text-sm max-w-sm backdrop-blur-md text-slate-300 shadow-xl">
          <p className="leading-relaxed">
           los usarios son cargados por el administrador.
           </p>
           <br/> 
           <p className="leading-relaxed">Registrate con tu DNI para acceder al sistema</p>
         
          </div>
          </header>
       
         <section className="flex flex-col items-center text-center my-auto py-20">
         <h2 className="text-7xl font-extrabold mb-3 tracking-tighter leading-tight">
         <span className="text-violet-400">AulaAsync</span> 
         </h2>
         <p>organizando aulas, optimizando tiempos</p>
         <div className="w-28 h-1 bg-violet-500 mt-6 rounded-full"/>
           </section>

     <footer className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12 mt-auto">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full text-center">
        
        <div className="flex flex-col items-center p-6 bg-slate-900/10 border border-slate-800/40 rounded-xl">
          <h3 className="font-semibold text-lg text-white mb-2">Gestion de eventos</h3>
          <p className="text-sm text-slate-400 leading-relaxed">Organiza y asigna eventos academicos</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-900/10 border border-slate-800/40 rounded-xl">
          <h3 className="font-semibold text-lg text-white mb-2">Aulas disponibles</h3>
          <p className="text-sm text-slate-400 leading-relaxed">asignacion inteligente sin conflicto de horarios</p>
          </div>
           
          <div className="flex flex-col items-center p-6 bg-slate-900/10 border border-slate-800/40 rounded-xl">
          <h3 className="font-semibold text-lg text-white mb-2">Notificaciones</h3>
          <p className="text-sm text-slate-400 leading-relaxed">enterate de cambios  y avisos importantes</p> 
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-900/10 border border-slate-800/40 rounded-xl">
          <h3 className="font-semibold text-lg text-white mb-2">Para todos</h3>
          <p className="text-sm text-slate-400 leading-relaxed"> estudiantes,docentes y administradores</p>
          </div>
        </div>
    
         
          <Link href={"/login"}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 rounded-lg font-medium text-lg text-white shadow-lg inline-block">
           ingrear Sesion
          </Link>
   

      </footer>
    
      </main>
    </div>
  )
}



