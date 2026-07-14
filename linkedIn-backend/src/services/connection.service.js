import { Connection } from "../models/connection.model.js";
import User from "../models/user.models.js";
import { createNotificationService } from "./notification.service.js";

export const sendConnectionService = async (senderId, recieverId) => {
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

    await createNotificationService({
      recipient: recieverId,
      sender: senderId,
      type: "connection",
      message: "sent you a connection request.",
    });

    return newRequest;
  } catch (error) {
    throw error;
  }
};

export const acceptConnectionService = async (connectionId) => {
  try {
    const connection = await Connection.findById(connectionId);
    if (!connection) {
      throw new Error("No connection request found for accepting");
    }

    if (connection.status != "pending") {
      throw new Error("Request already under process");
    }

    connection.status = "accepted";
    let senderId = connection.sender;
    let recieverId = connection.reciever;
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

    await createNotificationService({
      recipient: senderId,
      sender: recieverId,
      type: "connection",
      message: "accepted your connection request.",
    });

    return connection;
  } catch (error) {
    throw error;
  }
};

export const rejectConnectionService = async (senderId, connectionId) => {
  try {
    console.log("in reject service");
    const connection = await Connection.findById(connectionId);
    console.log(connection);
    if (!connection) {
      throw new Error("No connection request found for accepting");
    }

    if (connection.status != "pending") {
      throw new Error("Request already under process");
    }

    connection.status = "rejected";
    await connection.save();

    return connection;
  } catch (error) {
    throw error;
  }
};

export const getConnectionStatusService = async (
  currentUserId,
  targetUserId,
) => {
  try {
    if (!currentUserId || !targetUserId) {
      throw new Error("no connection /connection request found");
    }

    let pendingRequest = await Connection.findOne({
      $or: [
        { sender: currentUserId, receiver: targetUserId },
        { sender: targetUserId, receiver: currentUserId },
      ],
      status: "pending",
    });

    if (pendingRequest) {
      if (pendingRequest.sender.toString() === currentUserId.toString()) {
        return { status: "pending" };
      } else {
        return { status: "received", requestId: pendingRequest._id };
      }
    }

    let connectedUser =
      await User.findById(currentUserId).select("connections");
    if (!connectedUser) {
      throw new Error("User not found");
    }
    const isConnected = connectedUser.connections.some(
      (id) => id.toString() === targetUserId.toString(),
    );
    if (isConnected) {
      return { status: "unfollow" };
    }

    return { status: "none" };
  } catch (error) {
    throw error;
  }
};

export const removeConnection = async (myId, otherUserId) => {
  const session = await mongoose.startSession();

  try {
    console.log("running service for remove connection");
    session.startTransaction();

    const [user1, user2] = await Promise.all([
      User.findByIdAndUpdate(
        myId,
        {
          $pull: {
            connections: otherUserId,
          },
        },
        { session, new: true },
      ),

      User.findByIdAndUpdate(
        otherUserId,
        {
          $pull: {
            connections: myId,
          },
        },
        { session, new: true },
      ),
    ]);

    if (!user1 || !user2) {
      throw new Error("User not found");
    }

    await session.commitTransaction();

    return true;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export const pendingConnectionsService = async (userId) => {
  try {
    console.log(userId);
    const pendingRequests = await Connection.find({
      reciever: userId,
      status: "pending",
    }).populate("sender", "firstname lastname profilePic headline location");

    return pendingRequests;
  } catch (error) {
    throw error;
  }
};
