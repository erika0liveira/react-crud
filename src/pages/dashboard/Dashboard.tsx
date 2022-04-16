import { ListingTool } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const Dashboard = () => {

  return (
    <LayoutBase title="Página inicial" toolBar={(<ListingTool showSearchInput/>)}>
        Teste
    </LayoutBase>
  );
};