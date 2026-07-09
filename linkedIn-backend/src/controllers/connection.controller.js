import {
  acceptConnectionService,
  pendingConnectionsService,
  rejectConnectionService,
  sendConnectionService,
} from "../services/connection.service.js";

export const sendConnectionController = async (req, res) => {
  try {
    const { reciever } = req.params;
    const senderId = req.userId;
    const sendConnectionResponse = await sendConnectionService(
      senderId,
      reciever,
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
};

export const acceptConnectionController = async (req, res) => {
  try {
    console.log("inside accept controller");
    const { connectionId } = req.params;
    const senderId = req.userId;

    console.log(connectionId);
    console.log(`sender id ${senderId}`);

    let connectionResponse = await acceptConnectionService(connectionId);

    return res
      .status(200)
      .json({ message: "connection accepted", connectionResponse });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack, // remove this later in production
    });
  }
};

export async function rejectConnectionController(req, res) {
  try {
    console.log("________________________________________");
    // console.log(req.params);
    const connectionId = req.params.connectionId;
    const senderId = req.userId;

    console.log(senderId);
    console.log(connectionId);
    console.log("in reject connection controller");

    let connectionResponse = await rejectConnectionService(
      senderId,
      connectionId,
    );

    return res.status(200).json({ message: "connection rejected" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack, // remove this later in production
    });
  }
}

// export async function getConnectionStatusController(params) {}
// export async function removeConnectionController(params) {}

export const pendingConnectionsController = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(userId);
    const pendingRequests = await pendingConnectionsService(userId);
    return res.status(200).json({ message: pendingRequests });
  } catch (error) {
    res.status(500).json({ mesage: error.message, stack: error.stack });
  }
};
