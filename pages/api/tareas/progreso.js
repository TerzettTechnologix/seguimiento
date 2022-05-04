import {pool} from '../../../config/db'

export default async function proyecto (req,res) {
  try {
    const {data} = req.body
     const [totales] = await pool.query(`SELECT COUNT(*) FROM tarea WHERE id_proyecto = ${data}`)
     const [pendientes] = await pool.query(`SELECT COUNT(*) FROM tarea WHERE id_proyecto = ${data} AND status = 'F'`)
     const [enProceso] = await pool.query(`SELECT COUNT(*) FROM tarea WHERE id_proyecto = ${data} AND status = 'P'`)
     const [completadas] = await pool.query(`SELECT COUNT(*) FROM tarea WHERE id_proyecto = ${data} AND status = 'T'`)
     res.status(200).json({totales, pendientes, enProceso , completadas})
  }catch (error){
    console.log(error)
    res.status(400).json(error)
  }

}