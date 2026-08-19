import AdminSidebar from "../components/AdminSidebar"
import QuickAction from "../components/QuickAction"
import StatCard from "../components/StatCard"
import PipelineSummary from "../components/PipelineSummary"
import RecentActivity from "../components/RecentActivity"
import ActiveJobPostings from "../components/ActiveJobPostings"

import {
  quickActions,
  dashboardStats,
  pipelineData,
  recentActivities,
  activeJobs,
} from "../data/dashboardData"

function AdminDashboard() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AdminSidebar />

      <main className="ml-[280px] min-h-screen px-11 py-11">
        
        {/* Header */}
        <header className="mb-11">
          <p className="mb-2 text-[15px] font-semibold uppercase tracking-[0.2em] text-[#ed9413]">
            Overview
          </p>

          <h1 className="font-serif text-[38px] leading-none text-[#111925]">
            Dashboard
          </h1>

          <p className="mt-3 text-[15px] text-[#7184a8]">
            {currentDate}
          </p>
        </header>

        {/* Quick actions 
        <section className="mb-8 grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <QuickAction
              key={action.title}
              icon={action.icon}
              title={action.title}
            />
          ))}
        </section> */}

        {/* Statistics */}
        <section className="mb-11 grid grid-cols-4 gap-4">
          {dashboardStats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              label={stat.label}
              type={stat.type}
            />
          ))}
        </section>

        {/* Pipeline + Recent activity */}
        <section className="mb-8 grid grid-cols-[0.95fr_2.05fr] gap-8">
          <PipelineSummary data={pipelineData} />

          <RecentActivity activities={recentActivities} />
        </section>

        {/* Active jobs */}
        <ActiveJobPostings jobs={activeJobs} />

      </main>
    </div>
  )
}

export default AdminDashboard
