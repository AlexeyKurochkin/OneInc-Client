import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const InputForm = ({
  isEncoding,
  onSubmit,
  onCancel,
}: {
  isEncoding: boolean;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}) => {
  const [stringToIncode, setStringToIncode] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(stringToIncode);
    setStringToIncode("");
    onSubmit(stringToIncode);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography component="h1" variant="h5">
        String Encoder
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="stringToIncode"
          label="Enter encoding string..."
          name="stringToIncode"
          autoFocus
          disabled={isEncoding}
          value={stringToIncode}
          onChange={(e) => setStringToIncode(e.target.value)}
        />
        {isEncoding ? (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default InputForm;
