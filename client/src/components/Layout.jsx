import { Outlet } from "react-router-dom"
import Header from "./Header"


const Layout = () => {
  return (
    <div><main>
        <Header></Header>
        <Outlet></Outlet>
    </main>
    </div>
  )
}

export default Layout