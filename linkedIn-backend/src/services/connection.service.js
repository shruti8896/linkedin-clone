import { Connection } from "../models/connection.model.js";
import User from "../models/user.models.js";

export async function sendConnectionService(senderId, recieverId) {
  try {
    console.log("reaching sendConenctionService");
    if (senderId === recieverId) {
      return "Invalid request, cant send request to self";
    }
    const senderData = await User.findById(senderId);
    if (senderData.connections.includes(recieverId)) {
      return "you are already connected";
    }
    const existingConnection = await Connection.findOne({
      sender: senderId,
      reciever: recieverId,
      status: "pending",
    });
    if (existingConnection) {
      return "Connection already sent";
    }

    const newRequest = await Connection.create({
      sender: senderId,
      reciever: recieverId,
    });
    console.log("----------------New request-----");

    console.log(newRequest);

    return newRequest;
  } catch (error) {
    throw error;
  }
}

export async function acceptConnectionService(
  senderId,
  recieverId,
  connectionId,
) {
  try {
    const connection = await Connection.findById(connectionId);
    if (!connection) {
      throw new Error("No connection request found for accepting");
    }

    if (connection.status != "pending") {
      throw new Error("Request already under process");
    }

    connection.status = "accepted";
    await connection.save();

    await Promise.all([
      User.findByIdAndUpdate(senderId, {
        $addToSet: {
          connections: recieverId,
        },
      }),
      User.findByIdAndUpdate(recieverId, {
        $addToSet: {
          connections: senderId,
        },
      }),
    ]);

    return connection;
  } catch (error) {
    throw new Error("Error in accepting connection");
  }
}
