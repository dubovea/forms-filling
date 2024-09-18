import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { formPaths } from "@/constants/form";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="mt-4 px-4 py-4 text-center h-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Выберите форму для заполнения:
      </h1>
      <div className="flex flex-col gap-4">
        {formPaths.map((path) => (
          <Link key={path.route} to={path.route}>
            <Button variant="outline" size="lg" className="w-full  sm:text-lg">
              {path.title}
            </Button>
          </Link>
        ))}
      </div>
    </Container>
  );
}
