import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

export const DetailTool: React.FC = () => {
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

      <Button
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<Icon>save</Icon>}
      >Salvar</Button>

      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>save</Icon>}
      >Salvar e Voltar</Button>

      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>delete</Icon>}
      >Apagar</Button>

      <Divider orientation="vertical" />

      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
      >Voltar</Button>

    </Box>
  );
};