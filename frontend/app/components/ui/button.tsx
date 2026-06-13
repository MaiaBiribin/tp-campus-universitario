import buttons from "../../styles/buttons.module.css";

type Props={
children:React.ReactNode;
type?:"button"|"submit";
variant?:"primary"|"danger";
onClick?:()=>void;
}

export default function Button({
children,
type = "submit",
variant="primary",
onClick
}:Props){

return (

    <button
      type={type}
      onClick={onClick}
      className={buttons[variant]}
    >

      {children}

    </button>

  );

}