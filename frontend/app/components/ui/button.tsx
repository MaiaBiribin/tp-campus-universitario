import buttons from "../../styles/buttons.module.css";

type Props={
children:React.ReactNode;
type?:"button"|"submit";
variant?:"primary"|"danger";
onClick?:()=>void;
disabled?: boolean;
}

export default function Button({
children,
type = "submit",
variant="primary",
onClick,
disabled,
}:Props){

return (

    <button
      type={type}
      onClick={onClick}
      className={buttons[variant]}
      disabled={disabled}
    >

      {children}

    </button>

  );

}