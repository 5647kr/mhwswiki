import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-(--bg-color) h-25 border-b border-(--border-color) flex justify-center items-center">
      <h1>
        <Link to={"/"} className="heading1">
          MHWsWIKI
        </Link>
      </h1>
    </header>
  );
}
