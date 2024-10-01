import { Container } from "@/components/shared/container";
import { FormInputDownload } from "@/components/shared/form/form-input-download";
import { MainLabel } from "@/components/shared/main-label";
import { documents } from "@/lib/schema";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Documents() {
  return (
    <Container>
      <MainLabel
        children={
          <Link to="/forms" className="text-black">
            <Home />
          </Link>
        }
      />
      <div className="flex flex-col gap-4">
        {documents.map(({ filePath, label }) => (
          <FormInputDownload filePath={filePath} label={label} key={filePath} />
        ))}
      </div>
    </Container>
  );
}
