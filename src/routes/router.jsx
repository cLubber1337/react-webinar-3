import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ROUTES} from "./routes";
import App from "../app";


const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App/>
  },
  {
    path: ROUTES.PRODUCT,
    element: <div>PRODUCT</div>,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <div>NOT_FOUND</div>,
  },
])

export const Router = () => {
  return <RouterProvider router={router}/>
}