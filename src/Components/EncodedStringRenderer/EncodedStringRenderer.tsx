import { Paper, Typography, Box, CircularProgress } from "@mui/material";

const EncodedStringRenderer = ({
  isEncoding,
  encodedValue,
}: {
  isEncoding: boolean;
  encodedValue: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {isEncoding && <CircularProgress sx={{ my: 2 }} />}
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200", width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          {encodedValue}
        </Typography>
      </Paper>
    </Box>
  );
};

export default EncodedStringRenderer;
