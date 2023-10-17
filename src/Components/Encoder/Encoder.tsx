import { useState } from "react";
import { Container, Snackbar, Alert, Slide } from "@mui/material";
import InputForm from "../InputForm/InputForm";
import EncodedStringRenderer from "../EncodedStringRenderer/EncodedStringRenderer";
import useSignalR from "../../hooks/useSignalR";
import { signalRHubUrl } from "../../configuration/config";
import { ISubscription, HubConnectionState } from "@microsoft/signalr";

const Encoder = () => {
  const { connection } = useSignalR(signalRHubUrl);
  const [isEncoding, setIsEncoding] = useState(false);
  const [encodedValue, setEncodedValue] = useState<string>("");
  const [subscription, setSubscription] =
    useState<ISubscription<string> | null>(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const tryStartEncodingStream = async (message: string) => {
    if (connection && connection.state === HubConnectionState.Connected) {
      setIsEncoding(true);
      setEncodedValue("");
      setSnackBarOpen(true);
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
            error: () => {
              handleEncodingError();
            },
          });
        setSubscription(newSubscription);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSnackBarOpen(true);
    }
  };

  const handleReceiveSymbol = (symbol: string) => {
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
          tryStartEncodingStream(value);
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
