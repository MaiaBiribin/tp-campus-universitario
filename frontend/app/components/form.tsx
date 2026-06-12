import forms from "../styles/forms.module.css";
import layout from "../styles/layout.module.css";

type FormProps = {
  title: string;
  description: string;
  children: React.ReactNode;

  onSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;
};

export default function Form({
  title,
  description,
  children,
  onSubmit,
}: FormProps) {

  return (

    <main
      className={
        forms.formCard
      }
    >

      <header
        className={
          layout.header
        }
      >

        <h1>

          {title}

        </h1>

        <p>

          {description}

        </p>

      </header>

      <form
        onSubmit={onSubmit}
        className={
          forms.form
        }
      >

        {children}

      </form>

    </main>

  );

}
