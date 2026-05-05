const ChartCard = ({ title, sub, children, className = "" }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-5 ${className}`}
    >
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      {children}
    </div>
  );
};

export default ChartCard;
