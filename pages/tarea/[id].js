import { Navbar } from "../../components/Navbar/Navbar"
import { TareaView } from "../../components/Tareas/TareaView"
import config  from '../api/config'

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:3000${config.URL}tareas`)
  const data = await res.json()
  const paths = data.map(tarea =>{
    return {
      params: { id : tarea.id.toString() }
    }
  })
  return {
    paths,
    fallback: true
   }
}

export const getStaticProps = async (context) => {
 
  const id = context.params.id
  const res = await fetch(`http://localhost:3000${config.URL}tareas/${id}`)
  const [data] = await res.json()
  return {
    props: { tarea: data}
  }
}
const Tareas = ({tarea}) => {
  console.log(tarea)
  return (
    <>
    <Navbar/>
      <p>{tarea.id}</p>
      <p>{tarea.descripcion}</p>
    </>
  )
}

export default Tareas; 