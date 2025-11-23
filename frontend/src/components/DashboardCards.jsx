export const MiniCardDashboard = ({ title, value, icon }) => {
  return (
    <div className="rounded-2xl p-4 border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-2">
        <span className="p-2 rounded-lg bg-gray-100 text-gray-700">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          {title}
        </h2>
      </div>

      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
};
