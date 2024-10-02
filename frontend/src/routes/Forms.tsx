import { Container } from "@/components/shared/container";
import { MainLabel } from "@/components/shared/main-label";
import { Button } from "@/components/ui/button";
import { formPaths } from "@/constants/form";
import { useNavBack } from "@/hooks/useNavBack";
import { Link } from "react-router-dom";

export default function Forms() {
  useNavBack();

  return (
    <Container>
      <MainLabel />
      <p className="mb-4">Выберите нужный раздел</p>
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
