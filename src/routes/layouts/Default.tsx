import { Outlet } from "react-router";
import Header from "../../components/Header";

export default function Default() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="p-4 md:p-8 lg:px-12 lg:py-10 xl:px-20">
          <Outlet />
        </main>
      </div>
    </>
  );
}
