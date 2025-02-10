// Imports
import "../styles/TodoForm.css";
import { useState } from "react";
import * as yup from "yup";
import { TodoSchema, ErrorsData } from "../interfaces/TodoInterface";

const TodoForm = () => {
  // State för Todo
  const [todo, setTodo] = useState<TodoSchema>({
    id: "",
    title: "",
    description: "",
    status: "Ej påbörjad", // Standardvärde
  });

  // State för valideringsfel
  const [errors, setErrors] = useState<ErrorsData>({});

  // Valideringsschema med yup
  const validationSchema = yup.object({
    title: yup
      .string()
      .required("Du måste fylla i en titel")
      .min(3, "Titeln måste vara minst 3 tecken"),
    description: yup
      .string()
      .required("Du måste lägga till en beskrivning")
      .min(1, "Beskrivningen måste vara minst 1 tecken")
      .max(200, "Beskrivningen kan vara max 200 tecken"),
    status: yup.string().required("Du måste välja en status"),
  });

  // Array med status-värden
  const statusValues = ["Ej påbörjad", "Pågående", "Avklarad"];

  // Funktion för att skicka formuläret
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await validationSchema.validate(todo, { abortEarly: false });
      setErrors({});

      // Skicka todo till backend
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Något gick fel vid skapandet av todo.");
      }

      // Få det skapade todo-objektet med id från backend
      const createdTodo = await response.json();

      // Uppdatera state med det skapade todo-objektet
      setTodo({
        id: createdTodo.id,
        title: "",
        description: "",
        status: "Ej påbörjad",
      });

      console.log("Todo skickad: ", createdTodo);
    } catch (errors) {
      const validationErrors: ErrorsData = {};

      if (errors instanceof yup.ValidationError) {
        errors.inner.forEach((error) => {
          const prop = error.path as keyof ErrorsData;
          validationErrors[prop] = error.message;
        });

        setErrors(validationErrors);
      }
    }
  };

  return (
    //Kör submit-funktion
    <form onSubmit={submitForm} className="form-container">
      <h3 style={{ marginBottom: "2rem" }}>Lägg till:</h3>
      <div className="form-group">
        <label htmlFor="title">Titel:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={todo.title}
          //Uppdatera state
          onChange={(event) => setTodo({ ...todo, title: event.target.value })}
          className="input-field"
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Beskrivning:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={todo.description}
          onChange={(event) =>
            //Uppdatera state
            setTodo({ ...todo, description: event.target.value })
          }
          className="input-field"
        />
        {errors.description && (
          <span className="error-text">{errors.description}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          name="status"
          id="status"
          value={todo.status}
          //Uppdatera state
          onChange={(event) => setTodo({ ...todo, status: event.target.value })}
          className="select-field"
        >
          {/*Loopa igenom option-alternativ*/}
          {statusValues.map((status, id) => (
            <option key={id}>{status}</option>
          ))}
        </select>
        {errors.status && <span className="error-text">{errors.status}</span>}
      </div>

      <button type="submit" className="submit-button">
        Lägg till Todo
      </button>
    </form>
  );
};

export default TodoForm;
