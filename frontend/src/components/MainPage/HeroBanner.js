import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HeroBanner = () => {
  return (
    <Box
      sx={{
        bgcolor: "orange",
        p: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Vom Feld auf den Teller in 7 Stunden
        </Typography>
        <Typography variant="body1">Knuspr - Frisch geliefert!</Typography>
      </Box>
      <img
        src="/images/hero.jpg"
        alt="Banner"
        style={{ width: "200px", borderRadius: "8px" }}
      />
    </Box>
  );
};

export default HeroBanner;
