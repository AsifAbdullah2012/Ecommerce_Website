import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#232F3E",
        color: "white",
        p: 2,
        mt: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        &copy; 2025 Amazon Clone. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
