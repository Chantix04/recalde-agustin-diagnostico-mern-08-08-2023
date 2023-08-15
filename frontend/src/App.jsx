import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
   const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    descripcion: '',
    estado: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNuevaTarea(prevTarea => ({ ...prevTarea, [name]: value }));
  };

  const getTasks = async () => {
    fetch('http://localhost:4000/tasks') 
      .then(data => data.json())
      .then(response => {
        setTareas(response)
      })
      .catch(error => console.error('Error al hacer el fetch:', error))
  }

  const handleSubmit = async event => {
    event.preventDefault();
  
    try {
      const res = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaTarea),
      });
  
      if (res.ok) {
        console.log('Tarea creada exitosamente');
        getTasks()
      } else {
        console.error('Error al crear la tarea');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  
  
  const eliminarTarea = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'isActive':false
        })
      }).then((res) => {
        console.log(res);
        getTasks();

      })
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getTasks()
  }, []);
  

  return(
    <>
      <div className="container">
        <h1>TP: Tareas</h1>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={nuevaTarea.titulo}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <input
              name="descripcion"
              id="descripcion"
              type="text"
              value={nuevaTarea.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="estado">Estado:</label>
            <select name="estado" id="estado" value={nuevaTarea.estado} onChange={handleInputChange}>
              <option value="pendiente">Pendiente</option>
              <option value="en proceso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <button type="submit" className='buttonEnviar'>Agregar Tarea</button>
        </form>
        <ul className="lista">
          {tareas.map(task => (
            <li key={task._id} className="item">
              <strong>{task.titulo}</strong>
              <p>{task.descripcion}</p>
              <p>Estado: {task.estado}</p>
              <button className='button' onClick={() => eliminarTarea(task._id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App;
