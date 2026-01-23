import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { getDashboardStats } from "../api/dashboard.api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSchemes: 0,
    departments: 0,
    totalSubmissions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="System overview and statistics"
      />

      {loading ? (
        <div className="mt-6 text-gray-500">
          Loading dashboard...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card
            title="Total Schemes"
            value={stats.totalSchemes}
          />

          <Card
            title="Total Submissions"
            value={stats.totalSubmissions}
          />

          <Card
            title="Departments"
            value={stats.departments}
          />
        </div>
      )}
    </div>
  );
}
