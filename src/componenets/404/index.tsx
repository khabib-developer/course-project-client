import { Box, Typography } from "@mui/material";
export const NOtFound = () => {
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
      <Typography variant="h1" component="h2" color="text.secondary">
        404
      </Typography>
    </Box>
  );
};
