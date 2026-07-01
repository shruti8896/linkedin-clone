import {
  acceptConnectionService,
  sendConnectionService,
} from "../services/connection.service.js";

export async function sendConnectionController(req, res) {
  try {
    const { reciever } = req.params;
    const senderId = req.userId;
    const sendConnectionResponse = await sendConnectionService(
      reciever,
      senderId,
    );
    console.log(sendConnectionResponse);
    if (sendConnectionResponse === "you are already connected") {
      res.status(403).send("You are already connected");
      return;
    }
    if (sendConnectionResponse === "Connection already sent") {
      res.status(403).send("Connection already sent");
      return;
    }
    if (
      sendConnectionResponse === "Invalid request, cant send request to self"
    ) {
      res.status(403).send("Invalid request, can't send request to self");
      return;
    }
    return res.status(200).json({ sendConnectionResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      stack: error.stack, // remove this later in production
    });
  }
}

export function acceptConnectionController(req, res) {
  try {
    const { id, connectionId } = req.params;
    const senderId = req.userId;

    let connectionResponse = acceptConnectionService(
      senderId,
      id,
      connectionId,
    );

    return res.status(201).json(connectionResponse);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack, // remove this later in production
    });
  }
}
