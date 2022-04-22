import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { ListingTool } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBase } from "../../shared/layouts";
import { PeopleServices } from "../../shared/services/api/people/PeopleServices";

export const PeopleListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      PeopleServices.getAll(1, search)
        .then((result) => {
          if(result instanceof Error){
            alert(result.message);
          } else {
            console.log(result);
          }
        });
    });
  }, [search]);

  return (
    <LayoutBase
      title="Listagem de pessoas"
      toolBar={
        <ListingTool 
          showSearchInput
          searchText={search}
          btnText="Nova"
          changeSearchText={text => setSearchParams({ search: text }, { replace: true })}
        />
      }
    >
      Listagem de Pessoas :-)
    </LayoutBase>
  );
};