import { Outlet, Link } from "react-router-dom"
import { AiFillHome, AiFillPlusSquare } from "react-icons/ai";
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
      <Toaster/>
      <div className="bg-gray-950 min-h-screen flex justify-center">
        <div>
          <h1 className="font-bold text-center text-xl text-red-200 mt-5">
            CRUD DRF REACT QUERY
          </h1>
            <div className="flex justify-center m-3">
            <Link className="m-2 text-slate-200 hover:text-white transition-colors" to="/"><AiFillHome size={30}/></Link>
            <Link className="m-2 text-slate-200 hover:text-white transition-colors" to="/add"><AiFillPlusSquare size={30}/></Link>
            </div>
        <Outlet />
        </div>
    </div>
    </>
  )
}

export default Layout
