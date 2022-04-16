import { Box, Button, Divider, Icon, Paper, useTheme, Skeleton, Typography, useMediaQuery } from "@mui/material";

interface IDetailToolProps {
  newBtnText?: string;
  showSaveBtn?: boolean;
  showNewBtn?: boolean;
  showReturnBtn?: boolean;
  showDeleteBtn?: boolean;
  showReturnSaveBtn?: boolean;

  showNewBtnLoading?: boolean;
  showSaveBtnLoading?: boolean;
  showReturnSaveBtnLoading?: boolean;
  showDeleteBtnLoading?: boolean;
  showReturnBtnLoading?: boolean;

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

  showNewBtnLoading = false,
  showSaveBtnLoading = false,
  showReturnSaveBtnLoading = false,
  showDeleteBtnLoading = false,
  showReturnBtnLoading = false,

  newOnClick,
  saveOnClick,
  returnSaveOnClick,
  deleteOnClick,
  returnOnClick,
  
}) => {
  const theme = useTheme();
    
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

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
      {(showNewBtn && !showNewBtnLoading && !smDown) &&(<Button
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<Icon>add</Icon>}
        onClick={newOnClick}
      >{ newBtnText }</Button>)}

      {(showNewBtnLoading && !smDown) &&(<Skeleton width={109} height={58}/>)}

      {(showSaveBtn && !showSaveBtnLoading) &&(<Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>save</Icon>}
        onClick={saveOnClick}
      >
        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden"> 
          Salvar
        </Typography>
      </Button>)}

      {showSaveBtnLoading &&(<Skeleton width={109} height={58}/>)}

      {(showReturnSaveBtn && !showReturnSaveBtnLoading && !smDown && !mdDown) &&(<Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>save</Icon>}
        onClick={returnSaveOnClick}
      >
        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden"> 
          Salvar e Voltar
        </Typography>
      </Button>)}

      {(showReturnSaveBtnLoading && !smDown && !mdDown) &&(<Skeleton width={180} height={58}/>)}

      {(showDeleteBtn && !showDeleteBtnLoading) &&(<Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>delete</Icon>}
        onClick={deleteOnClick}
      >
        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden"> 
          Apagar
        </Typography>
      </Button>)}

      {showDeleteBtnLoading &&(<Skeleton width={109} height={58}/>)}

      {
        (showReturnBtnLoading && (showNewBtnLoading || showSaveBtnLoading || showReturnSaveBtnLoading || showDeleteBtnLoading)
        ) && (<Divider orientation="vertical" />)
      }

      {(showReturnBtn && !showReturnBtnLoading) &&(<Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
        onClick={returnOnClick}
      >        
        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden"> 
            Voltar
        </Typography>
      </Button>)}

      {showReturnBtnLoading &&(<Skeleton width={109} height={58}/>)}

    </Box>
  );
};