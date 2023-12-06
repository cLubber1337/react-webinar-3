import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ROUTES} from "./routes";
import App from "../app";
import Product from "../app/product";


const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App/>
  },
  {
    path: `${ROUTES.PRODUCT}/:id`,
    element: <Product />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <div>NOT_FOUND</div>,
  },
])

export const Router = () => {
  return <RouterProvider router={router}/>
}