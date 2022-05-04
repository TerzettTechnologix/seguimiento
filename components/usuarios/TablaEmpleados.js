import { useState, useEffect } from 'react'
import config from '../../pages/api/config'
import axios from 'axios'
import Swal from 'sweetalert2'
export function TablaEmpleados () {
  const [empleados, setEmpleados] = useState([])
  const cargarEmpleados = async () => {
    try {
      const response = await axios.get(`${config.URL}empleados`)
      const data = await response.data
      setEmpleados(data)
    } catch (error) {
      console.log(error)
    }
  }

  const resetPass = async (e,id) => {
    e.preventDefault()
    try {
      const data = {password: 'pass123', id}
      await axios.post(`${config.URL}empleados/changePass/`, data)
      Swal.fire({
        title: 'Contraseña reseteada',
        text: 'La contraseña ha sido reseteada',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } catch (error) {
      Swal.fire({
        title: 'Error', 
        text: 'No se pudo resetear la contraseña',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return error
    }
  }
  const eliminarEmpleado = async (e, id) => {
      e.preventDefault()
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.value) {
          axios.delete(`${config.URL}empleados/${id}`)
          Swal.fire(
            'Eliminado!',
            'El empleado ha sido eliminado.',
            'success'
          )
          window.location.reload()
        }
      })
  }
  useEffect(() => {
    cargarEmpleados()
  }, [])
  return (

    <div className = 'max-w-10xl mx-5'>
    <div className = 'flex flex-col'>
      <div className = 'overflow-x-auto shadow-md sm:rounded-lg'>
        <div className = 'inline-block min-w-full align-middle'>
          <div className = 'overflow-hidden'>
           <table className= 'min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700'>
            <thead className = 'bg-gray-100 dark:bg-gray-700'>
              <tr>
                <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-200'>Nombre</th>
                <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200 text-center'>Apellido Paterno</th>
                <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-200'>Apellido Materno</th>
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-200'>Numero de <br/>empleado</th>
           
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-200'>Puesto</th>
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-200'>Email</th>
             
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-200'>Rol</th>

              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-200'>Restablecer <br/>Contraseña</th>
            
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-200'>Eliminar</th>
              </tr>

            </thead>
            <tbody className = 'bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
            {empleados.map((empleado) => (
                    <tr className = 'hover:bg-gray-100 dark:hover:bg-gray-700' key={empleado.id}>
                        <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.nombre }</td>
                        <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.apellido_paterno }</td>
                        <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.apellido_materno }</td>
                        <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{empleado.numero_empleado }</td>
                        <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-left'>{empleado.puesto }</td>
                        <td className = 'py-4 px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-left'>{empleado.email }</td>
                        <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>{empleado.rol }</td>
                        <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        <button onClick = {(e)=>resetPass(e,empleado.id)}><span><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
</svg> </span></button></td>
                        <td className = 'py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'><button onClick = {(e)=>{eliminarEmpleado(e, empleado.id)}}><span><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg></span></button> </td> </tr>
                ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>
  </div>


  )
}
