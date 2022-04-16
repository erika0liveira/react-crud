import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IDetailToolProps {
  newBtnText?: string;
  showSaveBtn?: boolean;
  showNewBtn?: boolean;
  showReturnBtn?: boolean;
  showDeleteBtn?: boolean;
  showReturnSaveBtn?: boolean;

  saveOnClick?: () => void;
  newOnClick?: () => void;
  returnOnClick?: () => void;
  deleteOnClick?: () => void;
  returnSaveOnClick?: () => void;
}

export const DetailTool: React.FC<IDetailToolProps> = ({
  newBtnText = "Novo",

  showNewBtn = true,
  showSaveBtn = true,
  showReturnSaveBtn = false,
  showDeleteBtn = true,
  showReturnBtn = true,

  newOnClick,
  saveOnClick,
  returnSaveOnClick,
  deleteOnClick,
  returnOnClick,
  
}) => {
  const theme = useTheme();
  
  return (
    <Box 
      component={Paper}
      display="flex" 
      gap={1}
      alignItems="center"
      height={theme.spacing(5)} 
      padding={1}
      marginX={1}
      paddingX={1}
    >
      {showNewBtn &&(<Button
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<Icon>add</Icon>}
        onClick={newOnClick}
      >{ newBtnText }</Button>)}

      {showSaveBtn &&(<Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>save</Icon>}
        onClick={saveOnClick}
      >Salvar</Button>)}

      {showReturnSaveBtn &&(<Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>save</Icon>}
        onClick={returnSaveOnClick}
      >Salvar e Voltar</Button>)}

      {showDeleteBtn &&(<Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>delete</Icon>}
        onClick={deleteOnClick}
      >Apagar</Button>)}

      <Divider orientation="vertical" />

      {showReturnBtn &&(<Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
        onClick={returnOnClick}
      >Voltar</Button>)}

    </Box>
  );
};