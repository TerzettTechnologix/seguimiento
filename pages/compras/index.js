import { FormReq } from '../../components/compras/FormReq'
import { Navbar } from '../../components/Navbar/Navbar'

export default function Compras () {
  return (
    <>
    <Navbar/>
    <div className = 'h-screen bg-gray-800'>
      <FormReq/>
    </div>
    </>
  )
}