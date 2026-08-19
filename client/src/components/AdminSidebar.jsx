import { NavLink } from "react-router-dom"
const menuItems = [
  {
    label: "Dashboard",
    icon: "▦",
    active: true,
  },
  {
    label: "Job Postings",
    icon: "▣",
  },
  {
    label: "Pipeline",
    icon: "▥",
  },
  {
    label: "Candidates",
    icon: "♙",
  },
]

function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[260px] flex-col bg-[#0d1523] text-white">
      
      {/* Brand */}
      <div className="flex h-[80px] items-center border-b border-[#263147] px-7">
        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#f6a313] text-2xl font-bold">
          ▦
        </div>

        <div>
          <h1 className="text-[16px] font-bold leading-tight">
            TalentBridge
          </h1>

          <p className="text-[13px] text-[#52698f]">
            Admin Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 pt-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `mb-2 flex w-full items-center gap-3 rounded-2xl px-5 py-2 transition ${
              isActive
              ? "bg-[#20366f] text-[#f6a313]"
              : "text-[#7388ae] hover:bg-[#17243a]"
            }`
          }
        >
          <span className="w-5 text-xl">▦</span>

          <span className="text-[15px] font-medium">
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/job-postings"
          className={({ isActive }) =>
            `mb-2 flex w-full items-center gap-3 rounded-2xl px-5 py-2 transition ${
              isActive
              ? "bg-[#20366f] text-[#f6a313]"
              : "text-[#7388ae] hover:bg-[#17243a]"
            }`
          }
        >
          <span className="w-5 text-xl">▣</span>

          <span className="text-[15px] font-medium">
            Job Postings
          </span>
        </NavLink>

        <NavLink
          to="/pipeline"
          className={({ isActive }) =>
            `mb-2 flex w-full items-center gap-3 rounded-2xl px-5 py-2 transition ${
              isActive
              ? "bg-[#20366f] text-[#f6a313]"
              : "text-[#7388ae] hover:bg-[#17243a]"
            }`
          }
        >
          <span className="w-5 text-xl">▥</span>

          <span className="text-[15px] font-medium">
            Pipeline
          </span>
        </NavLink>

        <NavLink
          to="/candidates"
          className={({ isActive }) =>
            `mb-2 flex w-full items-center gap-3 rounded-2xl px-5 py-2 transition ${
              isActive
              ? "bg-[#20366f] text-[#f6a313]"
              : "text-[#7388ae] hover:bg-[#17243a]"
            }`
          }
        >
          <span className="w-5 text-xl">♙</span>

          <span className="text-[15px] font-medium">
            Candidates
          </span>
        </NavLink>
      </nav>

      {/* Admin profile */}
      <div className="mt-auto border-t border-[#263147] px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e397b] font-semibold text-[#f6a313]">
            HR
          </div>

          <div>
            <p className="text-[15px] font-semibold">
              HR Administrator
            </p>

            <p className="text-[14px] text-[#52698f]">
              hr@company.com
            </p>
          </div>
        </div>

        {/*} <button className="mt-7 text-[13px] text-[#52698f] hover:text-white">
          ← Back to portal select
        </button> */}
      </div>
    </aside>
  )
}

export default AdminSidebar