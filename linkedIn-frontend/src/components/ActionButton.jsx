const ActionButton = ({ icon, label, onClick, className }) => (
  <button
    onClick={onClick}
    className={`flex gap-1 items-center px-3 rounded-md  transition ${className}`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

export default ActionButton;
