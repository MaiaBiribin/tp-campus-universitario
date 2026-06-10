import NavLinks from "./navLinks";

export default function SideBar() {

  const role =
    "admin";

  return (

    <aside
      className="
      w-[260px]
      bg-[#0d1527]
      border-r
      border-[#27324d]
      p-8"
    >

      <h1
        className="
        text-3xl
        font-black
        mb-10"
      >
        Aula
        <span
          className="
          text-[#8b5cf6]"
        >
          Sync
        </span>
      </h1>

      <NavLinks
        role={role}
      />

    </aside>

  );
}