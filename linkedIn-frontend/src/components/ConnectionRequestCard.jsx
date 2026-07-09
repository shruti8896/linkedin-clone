import profileImage from "../assets/profile-picture.png";

function ConnectionRequestCard({ request, onAccept, onReject }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center mb-4">
      <div className="flex gap-4">
        <img
          src={request.sender.profilePic || profileImage}
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold text-lg">{request.sender.firstname}</h2>

          <p className="text-sm text-gray-600">{request.sender.headline}</p>

          <p className="text-sm text-gray-500">{request.sender.location}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onReject(request._id)}
          className="px-5 py-2 rounded-full border border-gray-500 text-gray-700 hover:bg-gray-100 transition"
        >
          Ignore
        </button>

        <button
          onClick={() => onAccept(request._id)}
          className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default ConnectionRequestCard;
