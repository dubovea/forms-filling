import { Button } from "@/components/ui/button"; // Импорт кнопки из Shadcn
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  filePath: string;
}
export const FormInputDownload: React.FC<Props> = ({ label, filePath }) => {
  // Путь к файлу в публичной папке или сервере
  const fileName = filePath.split("/")[1]; // Имя файла для скачивания

  const handleDownload = () => {
    // Создание временной ссылки для скачивания
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold">{label}</h2>
      </div>

      <Button onClick={handleDownload}>Скачать файл</Button>
    </div>
  );
};
