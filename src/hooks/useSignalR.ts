import { useState, useEffect } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

interface SignalRHook {
  connection: HubConnection | null;
  addEventHandler: (
    eventName: string,
    handler: (...args: unknown[]) => void
  ) => void;
  removeEventHandler: (
    eventName: string,
    handler: (...args: unknown[]) => void
  ) => void;
}

export default function useSignalR(hubUrl: string): SignalRHook {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    console.log("creating new HubConnectionBuilder");
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      console.log("disposing old HubConnectionBuilder");
      newConnection
        .stop()
        .catch((err) =>
          console.error("Error while stopping the connection: ", err)
        );
    };
  }, [hubUrl]);

  useEffect(() => {
    console.log(`starting connection: ${connection} `);
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected!");
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const addEventHandler = (
    eventName: string,
    handler: (...args: unknown[]) => void
  ) => {
    if (connection) {
      connection.on(eventName, handler);
    }
  };

  const removeEventHandler = (
    eventName: string,
    handler: (...args: unknown[]) => void
  ) => {
    if (connection) {
      connection.off(eventName, handler);
    }
  };

  return {
    connection,
    addEventHandler,
    removeEventHandler,
  };
}
