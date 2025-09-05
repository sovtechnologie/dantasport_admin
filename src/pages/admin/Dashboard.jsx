import "../../stylesheet/admin/dashboard.css"


const Dashboard = () => {
  // Sample data - later replace with real API calls
  const stats = [
    { label: 'Total Users', value: 120 },
    { label: 'Vendors', value: 34 },
    { label: 'Bookings Today', value: 45 },
    { label: 'Reports Pending', value: 6 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg text-gray-600">{stat.label}</h2>
            <p className="text-2xl font-semibold text-blue-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

