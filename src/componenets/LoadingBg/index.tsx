import { Box } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
export const LoadingBg = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <HourglassEmptyIcon />
    </Box>
  );
};
