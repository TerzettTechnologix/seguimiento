import { Collapse, Text, Link } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../pages/api/config'
import { FormTarea } from './FormTarea'
import Swal from 'sweetalert2'


export function TareasTable (props) {
  const [tareas, setTareas] = useState ([])
  const [visible, setVisible] = useState(1)
  const proceso = async (e,id) => {
    e.preventDefault()
    try { 
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const fecha = `${day}-${month}-${year}`
      if(month < 10){
         fecha  = `${day}-0${month}-${year}`
      }
      
      await axios.put(`${config.URL}tareas/${id}`, {status: 'P', fecha_inicio: fecha })
      Swal.fire({
        icon: 'success', 
        title: 'Se ha iniciado la tarea correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      return 
    }catch (error){ 
      Swal.fire({
        icon: 'error', 
        title: 'No se ha podido iniciar la tarea',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  const termino = async (e,id) => {
    e.preventDefault()
    try { 
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      const fecha = `${day}-${month}-${year}`
      if(month < 10){
         fecha  = `${day}-0${month}-${year}`
      }
      await axios.put(`${config.URL}tareas/${id}`, {status: 'T', fecha_fin: fecha})
      Swal.fire({
        icon: 'success', 
        title: 'Se he concluido con la tarea',
        showConfirmButton: false,
        timer: 1500
      })
      return 
    }catch (error){ 
      Swal.fire({
        icon: 'error', 
        title: 'No se ha podido terminar la tarea',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  const obtenerTareas = async () => {
    try{
      const result = await axios.post(`${config.URL}tareas/proyecto`, {data: props.id})
      const res = await result.data
        for( let i in res){
          const trabajo = await axios.get(`${config.URL}empleados/${res[i].trabajo}`)
          const [nombre] = await trabajo.data
          res[i].trabajo = nombre.nombre +' '+ nombre.apellido_paterno
        }
      setTareas(res)
     } catch (error) {
       return error
     }
  }
  useEffect( ()=> {obtenerTareas()},[visible])
  return (
    <div>
      <div className='flex justify-center w-full my-4'>
        <button className = 'bg-gray-700 text-white hover:brightness-150 p-2 rounded-l-xl hover:shadow-xl' onClick = {(e)=>{e.preventDefault(); setVisible(0)}}>Crear Tarea</button>
        <button className='bg-gray-700 text-white hover:brightness-150 p-2 hover:shadow-xl' onClick = {(e)=>{e.preventDefault(); setVisible(1)}}>Pendientes</button>
        <button className = 'bg-gray-700 text-white hover:brightness-150 p-2 hover:shadow=xl' onClick={(e)=>{e.preventDefault(); setVisible(2)}}>En proceso</button>
        <button className='bg-gray-700 text-white hover:brightness-150 p-2 rounded-r-xl hover:shadow-xl' onClick = {(e)=>{e.preventDefault(); setVisible(3)}}>Finalizadas</button>
      </div> 
   
    {visible === 0 ? <FormTarea {...props}/> : 
    <>
    {visible === 1 ? 
    <Collapse.Group>
      {tareas.map((tarea) =>( tarea.status === 'F' ? 
      <Collapse key = {tarea.id} title = {'Tarea id: '+tarea.id} className = 'bg-red-100 rounded-md p-6 font-extralight hover:shadow-xl hover:brightness-105 m-1'>
        <p className = 'font-bold'>Pendiente</p>
        <Text>{'Descripción: ' + tarea.descripcion}</Text>
        <Text>{'La tarea tiene una fecha de inicio el día '+ tarea.fecha_inicio}</Text>
        <Text>{'La tarea tiene una de entrega el día '+ tarea.fecha_fin}</Text>
        <Text>{tarea.trabajo} </Text>
        <div className  = 'flex justify-start w-full py-4'>
        <Link href = {'/tarea/'+ tarea.id} >Detalle de la tarea</Link>
        <button className = 'bg-gray-800 text-white hover:bg-gray-300 hover:text-gray-900 transition ease-in-out rounded-md p-2 ' onClick = {(e)=>proceso(e, tarea.id)}>Empezar tarea</button>
      </div>
      </Collapse> : ''
      ))}
    </Collapse.Group> : <> {visible === 2 ? <Collapse.Group>
      {tareas.map((tarea) =>( tarea.status === 'P' ? 
      <Collapse key = {tarea.id} title = {'Tarea id: '+tarea.id} className = 'bg-blue-100 rounded-md p-6 font-extralight hover:shadow-xl hover:brightness-105 m-1'>
      <p className = 'font-bold'>En proceso</p>
      <Text>{'Descripción: ' + tarea.descripcion}</Text>
      <Text>{'La tarea se inicio el día ' + tarea.fecha_inicio}</Text>
      <Text>{'La tarea tiene una fecha para concluir del dia ' + tarea.fecha_fin}</Text>
      <Text>{tarea.trabajo} </Text>
      <div className  = 'flex justify-start w-full py-4'>
        <button className = 'bg-gray-800 text-white hover:bg-gray-300 hover:text-gray-900 transition ease-in-out rounded-md p-2 ' onClick = {(e)=>termino(e, tarea.id)}>Terminar tarea</button>
      </div>
      </Collapse> : ''
      ))}
    </Collapse.Group> : <Collapse.Group>
      {tareas.map((tarea) =>( tarea.status === 'T' ? 
      <Collapse key = {tarea.id} title = {'Tarea id: '+tarea.id} className = 'bg-green-100 rounded-md p-6 font-extralight hover:shadow-xl hover:brightness-105 m-1'>
      <p className = 'font-bold'>Concluida</p>
      <Text>{'Descripción: ' + tarea.descripcion}</Text>
      <Text>{'La tarea se inicio el dia ' + tarea.fecha_inicio}</Text>
      <Text>{'La tarea termino el dia ' + tarea.fecha_fin}</Text>
      <Text>{tarea.trabajo} </Text>
      </Collapse> : ''
      ))}
    </Collapse.Group> } </>}
    </>
    } 
     
    </div>
  )
}




