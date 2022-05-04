import { Input, Spacer, Text } from "@nextui-org/react";
import axios from "axios";
import { useForm } from 'react-hook-form'
import config from "../../pages/api/config";
import  Swal  from 'sweetalert2'
import Cookie from 'universal-cookie'
import jwt from 'jsonwebtoken'

export function FormTarea (props) {
  const { handleSubmit, register } = useForm()

  const onSubmit = async (data) => {
    try {
      data.id_proyecto = props.id
      const fecha = new Date()
      let dia = fecha.getDate()
      let mes = fecha.getMonth() + 1
      let year = fecha.getFullYear()
      data.fecha = (dia + '/' + mes + '/' + year)
      data.status = 'F'
      const cookie = new Cookie()
      const token = cookie.get('session')
      const decoded = jwt.verify(token.token, config.SECRET) 
      data.trabajo = decoded.id
      await axios.post(`${config.URL}tareas`, data)
      Swal.fire({
        icon: 'success',
        title: 'Tarea creada satisfactoriamente',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()
      return console.log('ok')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al crear la tarea',
        confirmButtonText: 'Aceptar'
      })
      return error
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className='container text-center sm:text-center bg-neutral-100 rounded-lg  p-5
        drop-shadow-lg' >
          <Text size="1.5em">Crear tarea</Text>
          <Spacer y ={1.5}/>
          <Input width="80%" clearable underlined labelPlaceholder="¿Qué tarea vas a realizar? " {...register('descripcion', { required: true })}/>
          <Spacer y ={1}/>
          <div className = 'container place-content-around w-100'>
          <Input type = 'date' className='content-fit' label="¿Cuándo inicias? " {...register('fecha_inicio', { required: true })}/>
          <Input type = 'date' className='content-fit' label="¿Cuándo terminas? " {...register('fecha_fin', { required: true })}/>
          </div>
            <div className="flex flex-row place-content-around">
                <button className = 'bg-gray-800 text-white hover:bg-gray-300 hover:text-gray-900 transition ease-in-out rounded-md w-32 p-3 'type='reset'>Cancelar</button>
                <button className = 'bg-gray-800 text-white hover:bg-gray-300 hover:text-gray-900 transition ease-in-out rounded-md w-32 p-3 ' type='submit'>Guardar</button>
            </div>
      </form>
  </>
  )
}