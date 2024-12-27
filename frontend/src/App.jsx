import {createBrowserRouter, RouterProvider} from "react-router-dom"
import User from "./components/getUser/User"
import AddUser from "./components/addUser/AddUser"
import EditUser from "./components/updateUser/EditUser"

function App() {
 const route = createBrowserRouter([
  {
    path:"/",
    element:<User/>
  },
  {
    path:"/add",
    element:<AddUser/>
  },
  {
    path:"/edit/:id",
    element:<EditUser/>
  },
  
 ])

  return (
    <>
     <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
