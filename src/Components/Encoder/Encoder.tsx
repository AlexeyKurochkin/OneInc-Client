import { useState } from "react";
import { Container, Snackbar, Alert, Slide } from "@mui/material";
import InputForm from "../InputForm/InputForm";
import EncodedStringRenderer from "../EncodedStringRenderer/EncodedStringRenderer";
import useSignalR from "../../hooks/useSignalR";

const Encoder = () => {
  const { connection } = useSignalR("https://localhost:32771/hubs/encodingHub");
  const [isEncoding, setIsEncoding] = useState(false);
  const [encodedValue, setEncodedValue] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const startEncodingStream = async (message) => {
    if (connection && connection._connectionStarted) {
      try {
        const newSubscription = await connection
          .stream("StartEncodingStream", message)
          .subscribe({
            next: (item) => {
              handleReceiveSymbol(item);
            },
            complete: () => {
              handleEncodingFinished();
            },
            error: (error) => {
              handleEncodingError();
            },
          });
        setSubscription(newSubscription);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReceiveSymbol = (symbol) => {
    console.log(`Received symbol: ${symbol}`);
    setEncodedValue((existingValues) => existingValues + symbol);
  };

  const handleEncodingFinished = () => {
    console.log("Encoding complete");
    setIsEncoding(false);
  };

  const handleEncodingError = () => {
    setSnackBarOpen(true);
    setIsEncoding(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <InputForm
        isEncoding={isEncoding}
        onSubmit={(value) => {
          setIsEncoding(true);
          setEncodedValue("");
          setSnackBarOpen(true);
          startEncodingStream(value);
        }}
        onCancel={() => {
          console.log("canceled");
          setIsEncoding(false);
          subscription?.dispose();
        }}
      />
      <EncodedStringRenderer
        isEncoding={isEncoding}
        encodedValue={encodedValue}
      />
      <Snackbar
        open={snackBarOpen}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity={isEncoding ? "info" : "error"}
          sx={{ width: "100%" }}
        >
          {isEncoding
            ? "Encoding started"
            : "Something went wrong while encoding!"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Encoder;
