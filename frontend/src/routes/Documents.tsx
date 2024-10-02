import { Container } from "@/components/shared/container";
import { FormInputDownload } from "@/components/shared/form/form-input-download";
import { MainLabel } from "@/components/shared/main-label";
import { useNavBack } from "@/hooks/useNavBack";
import { Undo } from "lucide-react";
import { useEffect, useState } from "react";
import { File } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"; // Компонент для заглушек

export default function Documents() {
  useNavBack();
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [files, setFiles] = useState<{ fileName: string; filePath: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    // Получение списка файлов при монтировании компонента
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/files`, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "skip-browser-warning",
          },
        });
        const data = await response.json();
        if (!data.success) {
          toast.error("Ошибка при получении файлов. Попробуйте позже.");
        }
        setFiles(
          data.files.map((o: string) => ({
            fileName: o.split(".")[0],
            filePath: o,
          }))
        );
      } catch (error) {
        console.error("Ошибка при получении файлов:", error);
        toast.error("Не удалось загрузить файлы.");
      } finally {
        setLoading(false); // Завершаем состояние загрузки
      }
    };

    fetchFiles();
  }, []);

  return (
    <Container>
      <MainLabel
        children={
          <Link to="/forms" className="text-black">
            <Undo />
          </Link>
        }
      />
      <div className="flex flex-col gap-4">
        {loading
          ? // Отображаем заглушки, пока данные загружаются
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonFile key={index} />
            ))
          : // Отображаем файлы, когда загрузка завершена
            files.map(({ fileName, filePath }, index) => (
              <FormInputDownload
                fileName={fileName}
                filePath={filePath}
                key={`${fileName}-${index}`}
              />
            ))}
      </div>
    </Container>
  );
}

// Компонент-заглушка для имитации загрузки файла
function SkeletonFile() {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <File /> {/* Иконка */}
        <Skeleton className="w-48 h-4 rounded-md" /> {/* Заголовок */}
      </div>
      <Skeleton className="w-28 h-8 rounded-md" /> {/* Кнопка */}
    </div>
  );
}
