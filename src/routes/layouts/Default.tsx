import { Outlet } from "react-router";
import Header from "../../components/Header";

export default function Default() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
