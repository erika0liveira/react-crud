import { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, LinearProgress, Pagination, IconButton, Icon } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { PeopleServices, IPersonListing } from "../../shared/services/api/people/PeopleServices";
import { ListingTool } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";

export const PeopleListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IPersonListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleServices.getAll(page, search)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error){
            alert(result.message);
          } else {
            console.log(result);

            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });
    });
  }, [search, page]);

  const handleDelete = (id: number) => {
    if(confirm("Realmente deseja apagar?")) {
      PeopleServices.deleteById(id)
        .then(result => {
          if(result instanceof Error) {
            alert(result.message);
          } else {
            setRows(oldRows => {
              return [...oldRows.filter(oldRow => oldRow.id !== id)];
            });
            alert("Registro apagado com sucesso!");
          }
        });
    }
  };

  return (
    <LayoutBase
      title="Listagem de pessoas"
      toolBar={
        <ListingTool 
          showSearchInput
          searchText={search}
          btnText="Nova"
          changeSearchText={text => setSearchParams({ search: text, page: "1" }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>

                <TableCell>
                  <IconButton size="small" onClick={() => navigate(`/people/detail/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LISTING}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}

            {(totalCount > 0 && totalCount > Environment.ROW_LIMIT) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.ROW_LIMIT)}
                    onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true})}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>  

        </Table>
      </TableContainer>
    </LayoutBase>
  );
};