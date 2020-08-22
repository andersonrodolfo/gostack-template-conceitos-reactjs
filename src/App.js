import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('repositories');
      const { data } = response;
      setRepositories(data)
    };
    getRepositories();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`
    });
    const { data } = response;
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>
      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
