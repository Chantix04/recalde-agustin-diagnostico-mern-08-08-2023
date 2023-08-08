import {useState, useEffect} from 'React'
import './App.css'

function App() {

  const crearTarea = async ({titulo, descripcion}) => {
    try {
      const request = await fetch('http://localhost:4000/tasks', {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          titulo,
          descripcion
        })
      })
      if(request.status != 201){
        alert('error al crear la tarea')
        return
      }
      const response = await request.json()
      if(response){
        alert('tarea creada correctamente.')
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarTareas = async () =>{
    try {
      const request = await fetch('http://localhost:4000/tasks')

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const descripcion = formData.get('descripcion')
    const titulo = formData.get('titulo')
    crearTarea({titulo,descripcion})
    .then((e)=>{
      console.log(e)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Lorem ipsum dolor sit amet."/>
        <input type="text" name="descripcion" placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore officiis voluptates explicabo adipisci quos dolore quasi accusamus corporis, aliquam ducimus!"/>
        <button type="submit">Crear tarea</button>
      </form>
    </>
  )
}

export default App
