const DashboardStats = ({ stat }) => {
  return (
    <div
      key={stat.title}
      className="w-full h-30 flex flex-col justify-center items-center border-r border-gray-200"
    >
      <div className="space-y-1">
        <h1 className="font-medium text-gray-400">{stat.title}</h1>
        {stat.title === 'Your Fine' && (
          <span className="text-4xl">{stat.value}</span>
        )}
        {stat.title !== 'Your Fine' && (
          <span className="text-4xl">{stat.value}+</span>
        )}
      </div>
    </div>
  );
};

export default DashboardStats;
