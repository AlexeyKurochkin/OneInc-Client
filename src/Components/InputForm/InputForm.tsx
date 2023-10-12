import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const InputForm = () => {
  const [stringToIncode, setStringToIncode] = useState("");
  const [encoding, setEncoding] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(stringToIncode);
    setStringToIncode("");
    setEncoding(true);
    event.preventDefault();
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
          disabled={encoding}
          value={stringToIncode}
          onChange={(e) => setStringToIncode(e.target.value)}
        />
        {encoding ? (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setEncoding(false)}
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
