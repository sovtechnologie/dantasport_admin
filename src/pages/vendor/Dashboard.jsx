import "../../stylesheet/vendor/dashboard.css";
import StatsSection from"../../components/StatsSection";

const Dashboard = () => {
  // Sample data - later replace with real API calls
  const stats = [
    { label: 'Total Rating', value: 120 },
    { label: 'Revenue', value: 34 },
    { label: 'Bookings Today', value: 45 },
    { label: 'Reports Pending', value: 6 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="dashboard-stat-card">
            <div className="dashboard-stat-label">{stat.label}</div>
            <div className="dashboard-stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
      
      {/* Additional dashboard content can go here */}
      <div className="dashboard-content">
        {/* <StatsSection/> */}
      </div>
    </div>
  );
};

export default Dashboard;