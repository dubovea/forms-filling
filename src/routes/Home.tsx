import { formPaths } from "@/constants/form";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {formPaths.map((path) => (
        <Link to={path.route}>{path.title}</Link>
      ))}
    </div>
  );
}
