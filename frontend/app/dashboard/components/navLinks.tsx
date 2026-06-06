'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const linksByRole = {
  admin: [
    { name: 'Usuarios', href: '/dashboard/admin/usuarios' },
    { name: 'Eventos', href: '/dashboard/admin/eventos' },
    { name: 'Aulas', href: '/dashboard/admin/aulas' },
  ],

  docente: [
    { name: 'Agenda', href: '/dashboard/docente/agenda' },
    { name: 'Eventos', href: '/dashboard/docente/eventos' },
    { name: 'Avisos', href: '/dashboard/docente/avisos' },
  ],

  estudiante: [
    { name: 'Mis eventos', href: '/dashboard/estudiante/eventos' },
    { name: 'Notificaciones', href: '/dashboard/estudiante/notificaciones' },
    { name: 'Aulas', href: '/dashboard/estudiante/aulas' },
  ],
};

export default function NavLinks() {
  const pathname = usePathname();

  // por ahra queda asi
  const role: 'admin' | 'docente' | 'estudiante' = 'estudiante';

  const links = linksByRole[role];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex h-[48px] items-center rounded-md px-3 text-sm font-medium transition-colors',
            'hover:bg-sky-100 hover:text-blue-600',
            {
              'bg-sky-100 text-blue-600': pathname === link.href,
            }
          )}
        >
          <p className="md:block">{link.name}</p>
        </Link>
      ))}
    </>
  );
}