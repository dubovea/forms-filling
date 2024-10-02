import { Separator } from "../ui/separator";

export const MainLabel = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <div className="font-bold text-center mb-2 flex flex-row justify-center relative">
        <div className="absolute -left-2 -top-6">{children && children}</div>
        <div>
          <p>ХАНТЫ-МАНСИЙСКОЕ РЕГИОНАЛЬНОЕ ОТДЕЛЕНИЕ</p>
          <p> МОЛОДЕЖНОЙ ОБЩЕРОССИЙСКОЙ ОБЩЕСТВЕННОЙ ОРГАНИЗАЦИИ</p>
          <p>«РОССИЙСКИЕ СТУДЕНЧЕСКИЕ ОТРЯДЫ»</p>
        </div>
      </div>
      <Separator className="mb-2" />
    </>
  );
};
