function ActiveJobPostings({ jobs }) {
  return (
    <section className="rounded-2xl border border-[#dbe2ee] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-[#151d2b]">
          Active Job Postings
        </h2>

        <button className="text-[14px] font-medium text-[#ee9411]">
          Manage jobs →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#e6ebf2] text-left">
              <th className="pb-4 text-[14px] font-semibold uppercase tracking-wide text-[#8999b7]">
                Job Title
              </th>

              <th className="pb-4 text-[14px] font-semibold uppercase tracking-wide text-[#8999b7]">
                Department
              </th>

              <th className="pb-4 text-[14px] font-semibold uppercase tracking-wide text-[#8999b7]">
                Type
              </th>

              <th className="pb-4 text-[14px] font-semibold uppercase tracking-wide text-[#8999b7]">
                Location
              </th>

              <th className="pb-4 text-[14px] font-semibold uppercase tracking-wide text-[#8999b7]">
                Applicants
              </th>

              <th className="pb-4 text-[14px] font-semibold uppercase tracking-wide text-[#8999b7]">
                Closes
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.title}
                className="border-b border-[#edf0f5] last:border-b-0"
              >
                <td className="py-4 text-[13px] font-semibold text-[#172033]">
                  {job.title}
                </td>

                <td className="py-4 text-[13px] text-[#7184a8]">
                  {job.department}
                </td>

                <td className="py-4">
                  <span className="rounded-md bg-[#eef1f7] px-3 py-1 text-[12px] font-semibold text-[#263d73]">
                    {job.type}
                  </span>
                </td>

                <td className="py-4 text-[13px] text-[#7184a8]">
                  {job.location}
                </td>

                <td className="py-4 text-[13px] text-[#263d73]">
                  {job.applicants}
                </td>

                <td className="py-4 font-mono text-[12px] text-[#8a9ab8]">
                  {job.closes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ActiveJobPostings