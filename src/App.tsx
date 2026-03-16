import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layouts/Default";
import Home from "./routes/pages/Home";
import Items from "./routes/pages/Items";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Default,
    children: [
      { path: "", Component: Home },
      { path: "/items", Component: Items },
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
