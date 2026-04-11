const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex gap-2 items-center px-3 py-1 rounded-md hover:bg-gray-100 transition"
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

export default ActionButton;
