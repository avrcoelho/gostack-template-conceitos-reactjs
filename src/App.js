import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      const { data } = await api.get("repositories");

      setProjects(data);
    }

    getProjects();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("repositories", {
      title: `Novo ${Date.now()}`,
      owner: "Andre Coelho",
    });

    setProjects([...projects, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newProjects = projects.filter((project) => project.id !== id);

    setProjects(newProjects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
