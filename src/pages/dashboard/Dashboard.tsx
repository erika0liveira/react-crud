import { DetailTool } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const Dashboard = () => {

  return (
    <LayoutBase
      title="Página inicial"
      toolBar={(
        <DetailTool showReturnSaveBtn/>
      )}>
        Teste
    </LayoutBase>
  );
};