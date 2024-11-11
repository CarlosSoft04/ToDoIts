import React from 'react';

function ToDo({ tarefa, removeTarefa, completeTarefa }) {
  return (
    <div
      className="todo-item"
      style={{
        textDecoration: tarefa.isCompleted ? 'line-through' : 'none', 
        marginBottom: '10px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
      }}
    >
      <span>{tarefa.text}</span>
      <div>
        <button 
          onClick={() => completeTarefa(tarefa.id)} 
          style={{ marginRight: '10px' }} 
        >
          {tarefa.isCompleted ? 'Desmarcar' : 'Completar'}
        </button>
        <button onClick={() => removeTarefa(tarefa.id)}>
          Remover
        </button>
      </div>
    </div>
  );
}

export default ToDo;
