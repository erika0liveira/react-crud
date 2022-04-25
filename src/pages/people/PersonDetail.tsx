import { LinearProgress } from "@mui/material";
import { Form } from "@unform/web";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DetailTool } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBase } from "../../shared/layouts";
import { PeopleServices } from "../../shared/services/api/people/PeopleServices";

export const PersonDetail: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if(id !== "nova") {
      setIsLoading(true);

      PeopleServices.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error){
            alert(result.message);
            navigate("/people");
          } else {
            setName(result.fullName);
            console.log(result);
          }
        });
    }
  }, [id]);
  
  const handleDelete = (id: number) => {
    if(confirm("Realmente deseja apagar esse registro?")) {
      PeopleServices.deleteById(id)
        .then(result => {
          if(result instanceof Error) {
            alert(result.message);
          } else {
            alert("Registro apagado com sucesso!");
            navigate("/people");
          }
        });
    }
  };

  return (
    <LayoutBase
      title={id === "new" ? "Cadastro de Nova Pessoa" : name}
      toolBar={
        <DetailTool 
          newBtnText="Nova"
          showReturnSaveBtn
          showNewBtn={id !== "new"}
          showDeleteBtn={id !== "new"}

          // returnSaveOnClick={() => {}}
          newOnClick={() => navigate("/people/detail/new")}
          deleteOnClick={() => handleDelete(Number(id))}
          // saveOnClick={() => {}}
          returnOnClick={() => navigate("/people")}
        />
      }
    >

      <Form onSubmit={console.log}>

        <VTextField
          name="fullName"
        />
      
      </Form>

      {isLoading && (
        <LinearProgress variant="indeterminate"/>
      )}

      <p>Detalhes id: {id}</p>
    </LayoutBase>
  );
};
