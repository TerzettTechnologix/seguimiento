import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import config from '../../pages/api/config'
import { useState, useEffect } from 'react'
export default function TablaMaterial () {
  const [materiales, setMateriales] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const cargarMateriales = async () => {
    try{
      const response = await axios.get(`${config.URL}material`)
      const result = await response.data
      setMateriales(result)
      setIsLoading(false)
    }catch (error){

      return error
    }
  }
  
  useEffect(()=>{
    cargarMateriales()
  },[])
  return ( <>{isLoading ? <div className='flex content-center justify-center'><Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
  /></div> :
  <div className = 'max-w-10xl mx-5'>
  <div className = 'flex flex-col'>
    <div className = 'overflow-x-auto shadow-md sm:rounded-lg'>
      <div className = 'inline-block min-w-full align-middle'>
        <div className = 'overflow-hidden'>
       <table className= 'min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 text-center'>
            <thead className = 'bg-gray-100 dark:bg-gray-700'>
          <tr >
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200'>Descripción</th>
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200'>Proveedor</th>
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200'>Cantidad</th>
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200'>Orden de compra</th>
              <th scope="col" className = 'py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-200'>Fecha de ingreso</th>
          </tr>
      </thead>
      <tbody className = 'bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
      {materiales.map((material) => (
        <tr className = 'hover:bg-gray-100 dark:hover:bg-gray-700 ' key = {material.id}>
          <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{material.descripcion}</td>
          <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{material.proveedor}</td>
          <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{material.cantidad}</td>
          <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{material.oc}</td>
          <td className = 'py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'>{material.fecha_ingreso}</td>
        </tr> 
      ))}
      </tbody>
  </table>

  </div>
  </div>
  </div>
  </div>
  </div>}</>
    
  )
}
