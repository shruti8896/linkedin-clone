import React from "react";
import ConnectionRequestCard from "../components/ConnectionRequestCard.jsx";
import { useConnectionContext } from "../contexts/connectionContext.jsx";
import {
  acceptConnection,
  rejectConnection,
} from "../services/connectionService.js";
import Navbar from "../components/Navbar.jsx";
import UserProfile from "../components/dashbooard/UserProfile.jsx";

function ConnectionRequests() {
  const { pendingConnectionList, fetchPendingConnections } =
    useConnectionContext();

  async function handleAccept(connectionId) {
    try {
      await acceptConnection(connectionId);
      fetchPendingConnections();
    } catch (err) {
      console.error("Accept failed:", err);
    }
  }

  async function handleReject(connectionId) {
    try {
      await rejectConnection(connectionId);
      fetchPendingConnections();
    } catch (err) {
      console.error("Reject failed:", err);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#f4f2ee]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Sidebar Profile */}
        <div className="w-full lg:w-[225px] flex-shrink-0 lg:sticky lg:top-20">
          <UserProfile />
        </div>

        {/* Middle Column: Connection Requests List */}
        <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h1 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-4">
            Pending Invitations ({pendingConnectionList.length})
          </h1>

          {pendingConnectionList.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">
              No pending connection requests.
            </p>
          ) : (
            <div className="divide-y divide-gray-100 -my-2">
              {pendingConnectionList.map((request) => (
                <ConnectionRequestCard
                  key={request._id}
                  request={request}
                  onAccept={() => handleAccept(request._id)}
                  onReject={() => handleReject(request._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectionRequests;
