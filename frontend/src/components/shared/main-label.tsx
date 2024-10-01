import { Separator } from "../ui/separator";

export const MainLabel = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <div className="font-bold text-center mb-2">
        <div className="fixed top-2 left-2">{children && children}</div>
        <p>ХАНТЫ-МАНСИЙСКОЕ РЕГИОНАЛЬНОЕ ОТДЕЛЕНИЕ</p>
        <p> МОЛОДЕЖНОЙ ОБЩЕРОССИЙСКОЙ ОБЩЕСТВЕННОЙ ОРГАНИЗАЦИИ</p>
        <p>«РОССИЙСКИЕ СТУДЕНЧЕСКИЕ ОТРЯДЫ»</p>
      </div>
      <Separator className="mb-2" />
    </>
  );
};
