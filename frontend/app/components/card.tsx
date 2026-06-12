import cards from "../styles/cards.module.css";

type Props={
children:React.ReactNode;
className?:string;
}

export default function Card({
children,
className=""
}:Props){

return(

<div
className={`
${cards.card}
${className}
`}
>

{children}

</div>

);

}