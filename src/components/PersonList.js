import React, { useEffect, useState } from "react";

import axios from "axios";

export default function PersonList(props) {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const persons = res.data;
      setPersons(persons);
    });
  });

  const handleChange = (event) => {
    setName({ name: event.target.value });
    setId({ id: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: name,
    };
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Person Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <button type="submit">Add</button>
      </form>
      <form onSubmit={handleDelete}>
        <label>
          Person ID:
          <input type="text" name="id" onChange={handleChange} />
        </label>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}
