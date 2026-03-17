import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layouts/Default";
import Home from "./routes/pages/Home";
import Items from "./routes/pages/items/Items";
import ItemsId from "./routes/pages/items/ItemsId";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Default,
    children: [
      { path: "", Component: Home },
      { path: "/items", Component: Items },
      { path: "/items/:id", Component: ItemsId },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
