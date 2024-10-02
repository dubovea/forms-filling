import { Button } from "@/components/ui/button"; // Импорт кнопки из Shadcn
import { File } from "lucide-react";
import toast from "react-hot-toast";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  fileName: string;
  filePath: string;
}
export const FormInputDownload: React.FC<Props> = ({ fileName, filePath }) => {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleDownload = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/send-file`, {
        method: "POST",
        body: JSON.stringify({
          fileName: filePath,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Файл успешно отправлен в чат!");
      } else {
        toast.error("Не удалось отправить файл в чат. Попробуйте позже.");
      }
    } catch (error) {
      console.error("Ошибка при отправке файла:", error);
      toast.error("Ошибка при отправке файла.");
    }
  };
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <File />
        <div>
          <h2 className="text-sm font-semibold">{fileName}</h2>
        </div>
      </div>

      <Button onClick={handleDownload}>Скачать файл</Button>
    </div>
  );
};
