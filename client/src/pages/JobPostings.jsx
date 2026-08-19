import { useMemo, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import JobFormModal from "../components/JobFormModal"
import { initialJobs } from "../data/dashboardData"

const emptyJob = {
  title: "",
  department: "",
  type: "Full-time",
  level: "Mid",
  location: "",
  salary: "",
  status: "Active",
  screeningQuestions: 0,
  applicants: 0,
  closes: "",
}

function JobPostings() {

  const [jobs, setJobs] = useState(initialJobs)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("Active")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [formData, setFormData] = useState(emptyJob)

  // ==== Job Counts ==== 
  const activeCount = jobs.filter(
    (job) => job.status === "Active"
  ).length

  const draftCount = jobs.filter(
    (job) => job.status === "Draft"
  ).length

  const closedCount = jobs.filter(
    (job) => job.status === "Closed"
  ).length

  // ==== Search + Filter ==== 
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesFilter = activeFilter === "All" || job.status === activeFilter

      const searchText = search.toLowerCase().trim()

      const matchesSearch =
        job.title
          .toLowerCase()
          .includes(searchText) ||

        job.department
          .toLowerCase()
          .includes(searchText) ||

        job.location
          .toLowerCase()
          .includes(searchText)

      return ( 
        matchesFilter && matchesSearch
      )
    })
  }, [jobs, search, activeFilter])

  // ==== Open New Job Form ==== 
  const handleNewJob = () => {
    setEditingJob(null)
    setFormData({
      ...emptyJob,
    })
    setIsFormOpen(true)
  }

  // ==== Open Edit Form ==== 
  const handleEdit = (job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      department: job.department,
      type: job.type,
      level: job.level,
      location: job.location,
      salary: job.salary,
      status: job.status,
      screeningQuestions:
        job.screeningQuestions,
      applicants: job.applicants,
      closes: job.closes,
    })
    setIsFormOpen(true)
  }

  // ===== Delete Job ===== 
  const handleDelete = (id) => {
    const job = jobs.find(
      (item) => item.id === id
    )

    if (!job) {
      return
    }

    const confirmed = window.confirm(`Are you sure you want to delete "${job.title}"?`)

    if (!confirmed) {
      return
    }

    setJobs((currentJobs) =>
      currentJobs.filter(
        (item) => item.id !== id
      )
    )
  }

  // ===== Form Input Change ===== 
  const handleChange = (event) => {
    const {name, value,} = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  // ===== Submit New / Edited Job ===== 
  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      !formData.title.trim() ||
      !formData.department.trim() ||
      !formData.location.trim() ||
      !formData.salary.trim() ||
      !formData.closes
    ) {
      alert(
        "Please fill in all required fields."
      )

      return
    }

    // ----- Edit Existing Job ----- 
    if (editingJob) {
      setJobs((currentJobs) =>
        currentJobs.map((job) => {

          if (job.id !== editingJob.id) {
            return job
          }

          return {
            ...job,
            ...formData,
            screeningQuestions:
              Number(
                formData.screeningQuestions
              ),
          }
        })
      )
    }
    // ----- Create New Job ----- 
    else {
      const newJob = {
        id: Date.now(),
        ...formData,
        screeningQuestions:
          Number(
            formData.screeningQuestions
          ),
        applicants: 0,
      }

      setJobs((currentJobs) => [
        newJob,
        ...currentJobs,
      ])
    }
    closeForm()
  }

  // ===== Close Form ===== 
  const closeForm = () => {
    setIsFormOpen(false)
    setEditingJob(null)
    setFormData({
      ...emptyJob,
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      <AdminSidebar />

      <main className="ml-[280px] px-11 py-11">

        {/* Page Header */}
        <div className="mb-11 flex items-start justify-between">

          <div>
            <p className="mb-2 text-[15px] font-semibold uppercase tracking-[0.2em] text-[#ed9413]">
              Manage
            </p>

            <h1 className="font-serif text-[38px] leading-none text-[#111925]">
              Job Postings
            </h1>
          </div>

          <button
            onClick={handleNewJob}
            className="rounded-2xl bg-[#20366f] px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-[#172c60]"
          >
            + &nbsp; New Job Post
          </button>

        </div>


        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-3 gap-5">
          <SummaryCard
            title="Active Jobs"
            value={activeCount}
            valueClass="text-[#08a96d]"
          />

          <SummaryCard
            title="Draft Jobs"
            value={draftCount}
            valueClass="text-[#ed9413]"
          />

          <SummaryCard
            title="Closed Jobs"
            value={closedCount}
            valueClass="text-[#7184a8]"
          />
        </div>

        {/* Search + Filters */}
        <div className="mb-8 flex items-center gap-4">

          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-[#8999b7]">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="h-[48px] w-full rounded-xl border border-[#dbe2ee] bg-white pl-12 pr-5 text-[15px] outline-none placeholder:text-[#8b99b3] focus:border-[#20366f]"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex h-[48px] overflow-hidden rounded-xl border border-[#dbe2ee] bg-white">
            {[
              "All",
              "Active",
              "Draft",
              "Closed",
            ].map((filter) => (

              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(filter)
                }
                className={`min-w-[90px] px-5 text-[15px] font-medium ${
                  activeFilter === filter
                    ? "bg-[#20366f] text-white"
                    : "text-[#7184a8] hover:bg-[#f4f6fa]"
                }`}
              >
                {filter}
              </button>

            ))}
          </div>

          {/* Result Count */}
          <span className="whitespace-nowrap text-[15px] text-[#8b99b3]">
            {filteredJobs.length} results
          </span>

        </div>

        {/* Jobs Table */}
        <div className="overflow-hidden rounded-2xl border border-[#dbe2ee] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1450px] border-collapse">
              <thead>

                <tr className="border-b border-[#dbe2ee] bg-[#f8f9fc]">
                  <TableHeading>
                    Job Title
                  </TableHeading>

                  <TableHeading>
                    Department
                  </TableHeading>

                  <TableHeading>
                    Type
                  </TableHeading>

                  <TableHeading>
                    Level
                  </TableHeading>

                  <TableHeading>
                    Location
                  </TableHeading>

                  <TableHeading>
                    Salary
                  </TableHeading>

                  <TableHeading>
                    Status
                  </TableHeading>

                  <TableHeading>
                    Screening Qs
                  </TableHeading>

                  <TableHeading>
                    Applicants
                  </TableHeading>

                  <TableHeading>
                    Closes
                  </TableHeading>

                  <TableHeading>
                    Actions
                  </TableHeading>
                </tr>

              </thead>

              <tbody>
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-[#edf0f5] last:border-b-0"
                  >

                    <td className="px-6 py-5">
                      <p className="max-w-[150px] text-[15px] font-semibold text-[#171e2b]">
                        {job.title}
                      </p>
                    </td>

                    <td className="px-4 py-5 text-[14px] text-[#7184a8]">
                      {job.department}
                    </td>

                    <td className="px-4 py-5">
                      <JobTypeBadge
                        type={job.type}
                      />
                    </td>

                    <td className="px-4 py-5 text-[14px] text-[#7184a8]">
                      {job.level}
                    </td>

                    <td className="max-w-[150px] px-4 py-5 text-[14px] text-[#7184a8]">
                      {job.location}
                    </td>

                    <td className="px-4 py-5 text-[14px] text-[#171e2b]">
                      {job.salary}
                    </td>

                    <td className="px-3 py-4">
                      <StatusBadge
                        status={job.status}
                      />
                    </td>

                    <td className="px-3 py-4 text-center">
                      {job.screeningQuestions > 0 ? (
                        <span className="rounded-md bg-[#eef1f7] px-3 py-1 font-mono text-[14px] text-[#263d73]">
                          {job.screeningQuestions} Qs
                        </span>
                      ) : (
                        <span className="text-[#8b99b3]">
                          —
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-5 text-center font-semibold text-[#263d73]">
                      {job.applicants}
                    </td>

                    <td className="px-4 py-5 font-mono text-[13px] text-[#8b99b3]">
                      {job.closes}
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(job)}
                          className="rounded-lg border border-[#dbe2ee] px-3 py-2 text-sm font-medium text-[#20366f] transition hover:bg-[#eef2fa]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(job.id)}
                          className="rounded-lg border border-[#f1d5d5] px-3 py-2 text-sm font-medium text-[#d94343] transition hover:bg-[#fff1f1]"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="px-6 py-16 text-center text-[#8b99b3]">
                No jobs found.
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Add / Edit Job Modal */}
      {isFormOpen && (
        <JobFormModal
          formData={formData}
          editingJob={editingJob}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}

    </div>
  )
}

function SummaryCard({
  title,
  value,
  valueClass,
}) {
  return (
    <div className="flex h-[92px] items-center justify-between rounded-2xl border border-[#dbe2ee] bg-white px-7">
      <span className="text-[16px] font-medium text-[#7184a8]">
        {title}
      </span>

      <span className={`text-[32px] font-semibold ${valueClass}`}>
        {value}
      </span>
    </div>
  )
}

function TableHeading({ children,}) {
  return (
    <th className="whitespace-nowrap px-4 py-5 text-left text-[15px] font-semibold uppercase tracking-wide text-[#8999b7]">
      {children}
    </th>
  )
}

function JobTypeBadge({ type,}) {
  const styles = {
    Remote: "bg-[#e4f9ef] text-[#08a96d]",

    "Full-time": "bg-[#edf4ff] text-[#326ce0]",

    Contract: "bg-[#fff0e1] text-[#c96319]",
  }

  return (
    <span
      className={`rounded-md px-3 py-1 text-[13px] font-semibold ${
        styles[type] ||
        "bg-[#eef1f7] text-[#263d73]"
      }`}
    >
      {type}
    </span>
  )
}

function StatusBadge({ status,}) {
  const styles = {
    Active: "bg-[#d7f8e9] text-[#08a96d]",

    Draft: "bg-[#fff1dd] text-[#ed9413]",

    Closed: "bg-[#eef1f7] text-[#7184a8]",
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-[13px] font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>
  )
}

export default JobPostings