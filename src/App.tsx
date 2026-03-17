import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layouts/Default";
import Home from "./routes/pages/Home";
import Items from "./routes/pages/items/Items";
import ItemsId from "./routes/pages/items/ItemsId";
import Skills from "./routes/pages/skills/Skills";
import SkillsId from "./routes/pages/skills/SkillsId";
import Charms from "./routes/pages/charms/Charms";
import CharmsId from "./routes/pages/charms/CharmsId";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Default,
    children: [
      { path: "", Component: Home },
      { path: "/items", Component: Items },
      { path: "/items/:id", Component: ItemsId },
      { path: "/skills", Component: Skills },
      { path: "/skills/:id", Component: SkillsId },
      { path: "/charms", Component: Charms },
      { path: "/charms/:id", Component: CharmsId },
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
