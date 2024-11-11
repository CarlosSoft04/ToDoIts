import './App.css';
import React, { useState, useEffect } from 'react';

import ToDo from './components/ToDo'; // Componente ToDo
import ToDoForm from './components/ToDoForm'; // Componente ToDoForm
import Search from './components/Search'; // Componente Search
import Filter from './components/Filter'; // Componente Filter

function App() {
  const [tarefas, setTarefas] = useState([]); // Estado para armazenar as tarefas
  const [filter, setFilter] = useState('All'); // Usado para exibir todas as tarefas, feitas ou não feitas
  const [sort, setSort] = useState('Asc'); // Define a ordem das tarefas (Crescente ou Decrescente)
  const [search, setSearch] = useState(''); // Filtra o campo de busca dos usuários

  useEffect(() => {
    // Tentar carregar os dados do localStorage ao montar o componente
    try {
      const salvarTodos = localStorage.getItem('tarefas'); // Recupera o item 'tarefas' do localStorage
      if (salvarTodos) {
        setTarefas(JSON.parse(salvarTodos)); // Converte a string JSON para um array e define o estado
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do localStorage:', error);
    }
  }, []);

  useEffect(() => {
    // Tentar salvar os dados no localStorage sempre que o estado 'tarefas' mudar
    try {
      localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Converte o array de tarefas para JSON e salva no localStorage
    } catch (error) {
      console.error('Erro ao salvar os dados no localStorage:', error);
    }
  }, [tarefas]);

  // Adiciona uma nova tarefa
  const addTarefa = (text, tipo) => {
    const novaTarefa = {
      id: Math.floor(Math.random() * 1000), // Gera um ID aleatório para a nova tarefa
      text, // Texto da tarefa
      tipo, // Tipo da tarefa
      isCompleted: false, // Define o estado inicial da tarefa como não completada
    };
    setTarefas([...tarefas, novaTarefa]); // Atualiza o estado com a nova tarefa
  };

  // Função para remover uma tarefa
  const removeTarefa = (id) => {
    const newTarefas = tarefas.filter((tarefa) => tarefa.id !== id); // Filtra a tarefa com o id fornecido
    setTarefas(newTarefas); // Atualiza o estado com as tarefas restantes
  };

  // Função para marcar uma tarefa como completa ou incompleta
  const completeTarefa = (id) => {
    const newTarefas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, isCompleted: !tarefa.isCompleted } : tarefa // Altera o estado de 'isCompleted'
    );
    setTarefas(newTarefas); // Atualiza o estado com as tarefas modificadas
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas:</h1>
      <Search search={search} setSearch={setSearch} /> {/* Componente de busca */}
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} /> {/* Componente de filtro e ordenação */}
      <div className="todo-list">
        {tarefas
          .filter((tarefa) =>
            filter === 'All'
              ? true
              : filter === 'Completed'
              ? tarefa.isCompleted
              : !tarefa.isCompleted
          ) // Filtro por status de completude
          .filter((tarefa) =>
            tarefa.text.toLowerCase().includes(search.toLowerCase()) // Filtro de busca por texto
          )
          .sort((a, b) =>
            sort === 'Asc'
              ? a.text.localeCompare(b.text) // Ordena em ordem crescente
              : b.text.localeCompare(a.text) // Ordena em ordem decrescente
          )
          .map((tarefa) => (
            <ToDo
              key={tarefa.id}
              tarefa={tarefa}
              removeTarefa={removeTarefa}
              completeTarefa={completeTarefa}
            />
          ))}
      </div>
      <div>
        <ToDoForm addTarefa={addTarefa} /> {/* Componente para adicionar uma nova tarefa */}
      </div>
    </div>
  );
}

export default App;
