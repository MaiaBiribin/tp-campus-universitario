"use client"
import Link from "next/link"

export default function AdminHome(){

  return(
    <div>
      <main>
        <header>
          <h1>Bienvenido:</h1>
        </header>

        <div>
            <Link href={"app/dashboard/admin/eventos"}
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
            > +agregar evento </Link>
        </div>

      </main>
    </div>
  )
}