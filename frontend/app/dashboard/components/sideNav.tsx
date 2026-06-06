import NavLinks from './navLinks';

export default function SideBar() {
  return (
    <aside className="h-screen w-64 bg-[#0d1527] border-r border-[#27324d] p-4">
      <nav className="flex flex-col gap-2">
        <NavLinks />
      </nav>
    </aside>
  );
}