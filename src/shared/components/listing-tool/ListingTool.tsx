import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IListingToolProps {
  searchText?: string;
  showSearchInput?: boolean;
  changeSearchText?: (newText: string) => void;
  btnText?: string;
  showNewBtn?: boolean;
  newOnClick?: () => void;
}

export const ListingTool: React.FC<IListingToolProps> = ({
  searchText = "",
  showSearchInput = false,
  changeSearchText,
  btnText = "Novo",
  showNewBtn = true,
  newOnClick,
}) => {
  const theme = useTheme();

  return(
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
      { showSearchInput && (
        <TextField 
          size="small" 
          placeholder="Pesquisar..."
          value={searchText}
          onChange={(e) => changeSearchText?.(e.target.value)}
        />
      )}

      <Box
        display="flex"
        justifyContent="end"
        flex={1}
      >{showNewBtn &&(
          <Button
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={newOnClick}
          >{btnText}</Button>
        )}
      </Box>

    </Box>
  );
};