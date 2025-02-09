import { useState } from "react";
import "../styles/TodoForm.css";

const TodoForm = ({ onTodoAdded }: { onTodoAdded: () => void }) => {
  //Skapar state för respektive fält
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ej påbörjad");

  //Funktion som hanterar POST-anrop
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = { title, description, status };

    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Något gick fel vid skapandet av todo.");
      }

      // Nollställ formuläret efter lyckad inlämning
      setTitle("");
      setDescription("");
      setStatus("Ej påbörjad");

      // Uppdatera todo-listan
      onTodoAdded();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Ny Todo</h3>
      <form onSubmit={handleSubmit} className="todo-form">
        <label htmlFor="title">Titel:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          //Sätt titel
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Beskrivning:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          //Sätt beskrivning
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <br />
        <label htmlFor="status">Status:</label>
        <select
          name="status"
          id="status"
          value={status}
          //Bestäm status
          onChange={(event) => setStatus(event.target.value)}
        >
          <option>Ej påbörjad</option>
          <option>Pågående</option>
          <option>Avklarad</option>
        </select>
        <br />
        <button type="submit">Lägg till Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
