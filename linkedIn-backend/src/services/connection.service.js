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
    throw error;
  }
}

export async function rejectConnectionService(
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

    connection.status = "rejected";
    await connection.save();

    return connection;
  } catch (error) {
    throw error;
  }
}

export async function getConnectionStatusService(currentUserId, targetUserId) {
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
}

async function removeConnection(myId, otherUserId) {
  const session = await mongoose.startSession();

  try {
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
}
