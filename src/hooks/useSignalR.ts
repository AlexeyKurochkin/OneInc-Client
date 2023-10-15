import { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export default function useSignalR(hubUrl) {
  const [connection, setConnection] = useState(null);

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
        .then((result) => {
          console.log("Connected!");
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const addEventHandler = (eventName, handler) => {
    if (connection) {
      connection.on(eventName, handler);
    }
  };

  const removeEventHandler = (eventName, handler) => {
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
