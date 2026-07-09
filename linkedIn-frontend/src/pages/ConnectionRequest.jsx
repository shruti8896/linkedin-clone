import { useState } from "react";
import ConnectionRequestCard from "../components/ConnectionRequestCard.jsx";
import { useConnectionContext } from "../contexts/connectionContext.jsx";
import {
  acceptConnection,
  rejectConnection,
} from "../services/connectionService.js";
import { useUserContext } from "../contexts/UserContext.jsx";
import Navbar from "../components/Navbar.jsx";

function ConnectionRequests() {
  const { pendingConnectionList, fetchPendingConnections } =
    useConnectionContext();
  const { currentUserData } = useUserContext();
  //   pendingConnectionList.map((req) => console.log(req));

  async function handleAccept(connectionId) {
    const acceptConnectionResp = await acceptConnection(connectionId);
    fetchPendingConnections();
    console.log(acceptConnectionResp);
  }
  async function handleReject(connectionId) {
    const acceptConnectionResp = await rejectConnection(connectionId);
    fetchPendingConnections();
    console.log(acceptConnectionResp);
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="bg-white rounded-xl shadow-md p-5">
        <h1 className="text-2xl font-semibold mb-6">Connection Requests</h1>

        {pendingConnectionList.length === 0 ? (
          <p className="text-gray-500">No pending connection requests.</p>
        ) : (
          pendingConnectionList.map((request) => (
            <ConnectionRequestCard
              key={request._id}
              request={request}
              onAccept={() => handleAccept(request._id)}
              onReject={() => handleReject(request._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ConnectionRequests;
