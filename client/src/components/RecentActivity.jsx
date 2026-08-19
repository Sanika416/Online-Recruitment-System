function RecentActivity({ activities }) {
  const statusStyles = {
    interview: "bg-[#fff1dc] text-[#ed9413]",
    applied: "bg-[#edf5ff] text-[#4388f7]",
    offered: "bg-[#e3faf1] text-[#08a96d]",
    hired: "bg-[#d2f7e7] text-[#08a96d]",
    screening: "bg-[#f1ebff] text-[#8955f5]",
  }

  return (
    <section className="rounded-2xl border border-[#dbe2ee] bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-[#151d2b]">
          Recent Activity
        </h2>

        <button className="text-[14px] font-medium text-[#ee9411]">
          View all →
        </button>
      </div>

      <div>
        {activities.map((activity) => (
          <div
            key={`${activity.name}-${activity.time}`}
            className="flex items-center gap-4 border-b border-[#edf0f5] py-4 last:border-b-0"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef1f7] text-[14px] font-semibold text-[#213a78]">
              {activity.initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[14px] leading-tight text-[#1a2231]">
                <span className="font-semibold">
                  {activity.name}
                </span>

                <span className="text-[#7184a8]">
                  {" "}— {activity.action}
                </span>
              </p>

              <p className="mt-1 text-[12px] text-[#8a9ab8]">
                {activity.role}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-[12px] font-medium ${statusStyles[activity.type]}`}
            >
              {activity.status}
            </span>

            <span className="w-12 text-right text-[12px] text-[#8a9ab8]">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentActivity