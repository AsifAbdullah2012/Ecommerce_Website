import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchBar from "./SearchBar";
import { Box } from "@mui/material";

const Navbar = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement search logic here
  };
  return (
    <AppBar position="static" sx={{ bgcolor: "#232F3E" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
          Amazon Clone
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
