import { useState, useEffect } from 'react'
import config from '../../pages/api/config'
import axios from 'axios'
import { Collapse, Progress, Spacer} from '@nextui-org/react'
import { Skeleton } from '@chakra-ui/react'
import Cookie from 'universal-cookie'
import jwt from 'jsonwebtoken'
import Link from 'next/link'

export function ProyectoCard () {
  const [misproyectos] = useState([])
  const [isloading, setIsloading] = useState (false)
  const [isloading2, setIsloading2] = useState (true)

  const formatoFecha = async (data)=> {
    for (let i in data){
      const result = data[i].fecha_fin.substring(0,10)
      data[i].fecha_fin = result
    }
    return data
  }
  async function tusProyectos (data)  {
    const userId = getId()
    for (let i in data) {
      if(data[i].creador_id == userId ){
        misproyectos[i] = data[i]
        if(!data[i].id){
          console.log(data[i])
        }else {
           const d = data[i].id
           const proyecto = await axios.post(`${config.URL}tareas/progreso`, {data: d})
           const result = await proyecto.data
            const [totales] = result.totales
            const [pendientes] = result.pendientes
            const [enProceso] = result.enProceso
            const [completadas] = result.completadas
            misproyectos[i].pendientes = pendientes['COUNT(*)']
            misproyectos[i].progreso = enProceso['COUNT(*)']
            misproyectos[i].completadas = completadas['COUNT(*)']
            misproyectos[i].totales = totales['COUNT(*)']
        }
      }else{
        const trabajo = data[i].trabajadores.split(',')
        for ( let j in trabajo) {
        if(userId == trabajo[j]){
            misproyectos[i] = data[i]
           }
      }
      }
    }
    if(misproyectos.length === 0 ){
      setIsloading2(false)
      setIsloading(true)
    }else{
      setIsloading(false) 
      setIsloading2(false)
    }
  }
  const buscarCreador = async (data) => {
    for (let i in data) {
      const creador = await axios.get(`${config.URL}empleados/${data[i].creador_id}`)
      const result = await creador.data[0]
      const nombre = result.nombre + ' ' + result.apellido_paterno + ' ' + result.apellido_materno
      data[i].nombre_creador = nombre.toString()
    }
    return data
  }
  const cargarProyectos = async () => {
    try {
      const result = await axios.get(`${config.URL}proyecto`)
      const data = await result.data
      const a = await buscarCreador(data)
      const b = await formatoFecha (a)
      tusProyectos(b)
    } catch (error) {
      return error
    }
  }
  const getId = () => { 
    const cookie = new Cookie()
    const token =  cookie.get('session')
    const decoded = jwt.verify(token.token, config.SECRET)
    const userId =  decoded.id
    return userId
  }
  useEffect(() => {
    cargarProyectos()
  },[])
  return (
    <div className = 'pt-5'>
      { isloading2 ? <div className = 'flex flex-col justify-center items-center'> 
  <Skeleton height='50px' width= '80%' />
  <Spacer y= {0.4}/>
  <Skeleton height='50px' width= '80%'/>
  <Spacer y= {0.4}/>
  <Skeleton height='50px' width= '80%' />
 </div>: <>
      {isloading ? <div className = 'container'> <p className="text-4xl font-normal text-pink-800 text-center">
  Aún no tienes proyectos 
</p></div>:<div className = 'container'> <Collapse.Group shadow >
              {misproyectos.map((proyecto) => (
                <Collapse className = "uppercase font-extralight text-xl" key={proyecto.id} title = {proyecto.nombre}>
                <p className='text-md normal-case font-bold' >Descripcion </p>
                <Spacer y = {0.5}/>
                <p >{proyecto.descripcion}</p>
                <Spacer y = {1}/>
                <p className = 'text-md font-bold'>Fecha de de entrega del proyecto</p>
                <Spacer  y = {0.2}/>
                <p className = 'text-md'>{proyecto.fecha_fin}</p>
                <Spacer y = {1}/>
                <p className = 'font-bold'>Líder del proyecto </p>
                <Spacer y = {0.2} />
                <p className='text-md'>{proyecto.nombre_creador}</p>
                <Spacer y ={1}/>
                <label className = 'text-md font-bold'>Progreso del proyecto</label>
                <Spacer y = {0.3}/>
                <div className = 'grid-cols-3 gap-3 '>
                  <label className = ' hover:text-red-500 cursor-pointer'> Tareas iniciar: {proyecto.pendientes} || </label>
                  <label className = ' hover:text-green-500 cursor-pointer'> Tareas en proceso: {proyecto.progreso} || </label>
                  <label className = ' hover:text-green-500 cursor-pointer'> Tareas realizadas: {proyecto.completadas} || </label>
                 <label className = ' hover:text-blue-500 cursor-pointer '> Total de tareas : {proyecto.totales}</label>
                </div>  
                <Progress value = {proyecto.completadas * 100 / proyecto.totales} readOnly striped color = 'success'/> 
                <span>{Math.floor(proyecto.completadas * 100 / proyecto.totales)} %</span>
                <Spacer y ={0.5}/> 
                <Link href= {'detalle/' + proyecto.id}><a className = 'bg-gray-700 text-white hover:bg-gray-500 p-2 rounded-md m-3 w-56' >Detalles</a></Link> 
                </Collapse>
              ))}
            </Collapse.Group> </div>}
      </>}
     
    </div>
  )
}
