import { useMemo, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import CandidateTable from "../components/CandidateTable"

// === Dummy Candidate Data === 
const initialCandidates = [
  {
    id: 1,
    name: "James O'Brien",
    initials: "JO",
    location: "Miami, FL",
    position: "Senior Frontend Engineer",
    stage: "Applied",
    appliedDate: "2026-08-12",
    rating: 4,
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "JavaScript",
      "CSS",
    ],
    email: "james.obrien@example.com",
    phone: "+1 305 555 0142",
    experience: "6 years",
    education: "B.Sc. Computer Science",
    summary:
      "Frontend engineer with strong experience building scalable web applications and modern user interfaces.",
  },
  {
    id: 2,
    name: "David Kim",
    initials: "DK",
    location: "Seattle, WA",
    position: "DevOps Engineer",
    stage: "Applied",
    appliedDate: "2026-08-10",
    rating: 3,
    skills: [
      "Kubernetes",
      "Terraform",
      "AWS",
      "Docker",
      "CI/CD",
    ],
    email: "david.kim@example.com",
    phone: "+1 206 555 0198",
    experience: "5 years",
    education: "B.Tech Information Technology",
    summary:
      "DevOps engineer experienced in cloud infrastructure, automation, deployment pipelines and container orchestration.",
  },
  {
    id: 3,
    name: "Leo Huang",
    initials: "LH",
    location: "New York, NY",
    position: "UX Designer",
    stage: "Screening",
    appliedDate: "2026-08-07",
    rating: 3,
    skills: [
      "Figma",
      "Sketch",
      "User Research",
      "Prototyping",
      "Wireframing",
    ],
    email: "leo.huang@example.com",
    phone: "+1 212 555 0124",
    experience: "4 years",
    education: "B.Des. Interaction Design",
    summary:
      "UX designer focused on user research, interaction design and creating intuitive digital experiences.",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    initials: "ER",
    location: "New York, NY",
    position: "UX Designer",
    stage: "Offered",
    appliedDate: "2026-08-06",
    rating: 5,
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
    ],
    email: "elena.rodriguez@example.com",
    phone: "+1 917 555 0167",
    experience: "7 years",
    education: "M.A. Human Computer Interaction",
    summary:
      "Senior UX designer with extensive experience in research-driven product design and design systems.",
  },
  {
    id: 5,
    name: "Thomas Mitchell",
    initials: "TM",
    location: "Seattle, WA",
    position: "Backend Engineer",
    stage: "Screening",
    appliedDate: "2026-08-05",
    rating: 4,
    skills: [
      "Go",
      "PostgreSQL",
      "Redis",
      "Node.js",
      "REST APIs",
    ],
    email: "thomas.mitchell@example.com",
    phone: "+1 206 555 0131",
    experience: "5 years",
    education: "B.Sc. Software Engineering",
    summary:
      "Backend engineer specializing in scalable APIs, distributed systems and high-performance services.",
  },
  {
    id: 6,
    name: "Marcus Johnson",
    initials: "MJ",
    location: "Austin, TX",
    position: "Product Manager",
    stage: "Screening",
    appliedDate: "2026-08-04",
    rating: 4,
    skills: [
      "Product Strategy",
      "SQL",
      "Roadmapping",
      "Analytics",
      "Agile",
    ],
    email: "marcus.johnson@example.com",
    phone: "+1 512 555 0188",
    experience: "8 years",
    education: "MBA Product Management",
    summary:
      "Product manager with experience leading cross-functional teams and building data-driven product strategies.",
  },
  {
    id: 7,
    name: "Sarah Chen",
    initials: "SC",
    location: "San Francisco, CA",
    position: "Senior Frontend Engineer",
    stage: "Interview",
    appliedDate: "2026-08-02",
    rating: 5,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Testing",
    ],
    email: "sarah.chen@example.com",
    phone: "+1 415 555 0118",
    experience: "7 years",
    education: "B.Sc. Computer Science",
    summary:
      "Senior frontend engineer specializing in React applications, frontend architecture and scalable UI systems.",
  },
  {
    id: 8,
    name: "Nadia Sousa",
    initials: "NS",
    location: "Boston, MA",
    position: "Product Manager",
    stage: "Interview",
    appliedDate: "2026-08-02",
    rating: 5,
    skills: [
      "Product Strategy",
      "Growth",
      "Analytics",
      "Research",
      "Agile",
    ],
    email: "nadia.sousa@example.com",
    phone: "+1 617 555 0172",
    experience: "6 years",
    education: "BBA Business Administration",
    summary:
      "Product manager with a strong background in growth strategy, analytics and customer-focused product development.",
  },
  {
    id: 9,
    name: "Priya Patel",
    initials: "PP",
    location: "Austin, TX",
    position: "Data Analyst",
    stage: "Hired",
    appliedDate: "2026-07-29",
    rating: 5,
    skills: [
      "SQL",
      "Python",
      "Power BI",
      "Excel",
      "Data Visualization",
    ],
    email: "priya.patel@example.com",
    phone: "+1 512 555 0155",
    experience: "4 years",
    education: "M.Sc. Data Science",
    summary:
      "Data analyst experienced in transforming business data into actionable insights through analytics and visualization.",
  },
  {
    id: 10,
    name: "Aisha Williams",
    initials: "AW",
    location: "Chicago, IL",
    position: "Senior Frontend Engineer",
    stage: "Rejected",
    appliedDate: "2026-07-30",
    rating: 2,
    skills: [
      "React",
      "Vue",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    email: "aisha.williams@example.com",
    phone: "+1 312 555 0191",
    experience: "4 years",
    education: "B.Sc. Computer Science",
    summary:
      "Frontend developer with experience working on modern JavaScript applications and responsive interfaces.",
  },
]

// === Candidate Profile Card === 
function CandidateProfile({
  candidate,
  onClose,
}) {
  if (!candidate) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[620px] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* Profile Header */}
        <div className="flex items-start justify-between border-b border-[#e4e8ef] px-7 py-6">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf1f8] text-[15px] font-semibold text-[#20366f]">
              {candidate.initials}
            </div>

            <div>
              <h2 className="text-[20px] font-semibold text-[#172033]">
                {candidate.name}
              </h2>

              <p className="mt-1 text-[14px] text-[#7182a1]">
                {candidate.position}
              </p>

              <p className="mt-0.5 text-[13px] text-[#9aa7bd]">
                {candidate.location}
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-[#7182a1] hover:bg-[#f1f4f8] hover:text-[#172033]"
          >
            ×
          </button>

        </div>

        {/* Profile Content */}
        <div className="max-h-[65vh] overflow-y-auto px-7 py-6">

          {/* Stage + Rating */}
          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-xl bg-[#f7f8fb] p-4">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-[#8a98b2]">
                Current Stage
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                  candidate.stage === "Applied"
                    ? "bg-[#edf4ff] text-[#326ce0]"
                    : candidate.stage === "Screening"
                    ? "bg-[#f0ebff] text-[#7b4ee4]"
                    : candidate.stage === "Interview"
                    ? "bg-[#fff1d9] text-[#c56e09]"
                    : candidate.stage === "Offered"
                    ? "bg-[#e4faf2] text-[#08775c]"
                    : candidate.stage === "Hired"
                    ? "bg-[#d9f8ec] text-[#08775c]"
                    : "bg-[#ffeaea] text-[#c62f2f]"
                }`}
              >
                {candidate.stage}
              </span>
            </div>


            <div className="rounded-xl bg-[#f7f8fb] p-4">

              <p className="text-[13px] font-semibold uppercase tracking-wide text-[#8a98b2]">
                Rating
              </p>

              <div className="mt-2 flex items-center gap-2">
                <div className="text-[17px]">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <span
                        key={star}
                        className={
                          star <= candidate.rating
                            ? "text-[#ed9413]"
                            : "text-[#d8deea]"
                        }
                      >
                        ★
                      </span>
                    )
                  )}
                </div>

                <span className="text-sm text-[#7182a1]">
                  {candidate.rating}/5
                </span>
              </div>

            </div>

          </div>

          {/* Contact Information */}
          <div className="mt-6">

            <h3 className="text-[16px] font-semibold text-[#172033]">
              Contact Information
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#8a98b2]">
                  Email
                </p>

                <p className="mt-1 text-sm text-[#435474]">
                  {candidate.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8a98b2]">
                  Phone
                </p>

                <p className="mt-1 text-sm text-[#435474]">
                  {candidate.phone}
                </p>
              </div>
            </div>

          </div>

          {/* Professional Information */}
          <div className="mt-6">
            <h3 className="text-[16px] font-semibold text-[#172033]">
              Professional Information
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#8a98b2]">
                  Position
                </p>

                <p className="mt-1 text-sm text-[#435474]">
                  {candidate.position}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8a98b2]">
                  Experience
                </p>

                <p className="mt-1 text-sm text-[#435474]">
                  {candidate.experience}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8a98b2]">
                  Applied On
                </p>

                <p className="mt-1 font-mono text-sm text-[#435474]">
                  {candidate.appliedDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8a98b2]">
                  Education
                </p>

                <p className="mt-1 text-sm text-[#435474]">
                  {candidate.education}
                </p>
              </div>
            </div>

          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="text-[16px] font-semibold text-[#172033]">
              Skills
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.skills.map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-[#eef1f7] px-3 py-1.5 text-sm text-[#435474]"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6">
            <h3 className="text-[16px] font-semibold text-[#172033]">
              Profile Summary
            </h3>

            <p className="mt-3 text-[14px] leading-6 text-[#7182a1]">
              {candidate.summary}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#e4e8ef] px-7 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#20366f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#182b5b]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

function Candidate() {

  const [candidates] = useState(initialCandidates)
  const [search, setSearch] = useState("")
  const [selectedStage, setSelectedStage] = useState("All")
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  const filteredCandidates = useMemo(() => {
    const searchText = search.toLowerCase().trim()

    return candidates.filter(
      (candidate) => {
        const matchesSearch =
          candidate.name
            .toLowerCase()
            .includes(searchText) ||
          candidate.position
            .toLowerCase()
            .includes(searchText) ||
          candidate.skills.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(searchText)
          )

        const matchesStage =
          selectedStage === "All" ||
          candidate.stage ===
            selectedStage

        return (
          matchesSearch &&
          matchesStage
        )
      }
    )
  }, [
    candidates,
    search,
    selectedStage,
  ])

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-[280px] min-h-screen px-10 py-8">

        {/* Page Header */}
        <div>
          <p className="mb-2 text-[14px] font-semibold uppercase tracking-[0.2em] text-[#ed9413]">
            Talent Pool
          </p>

          <h1 className="font-serif text-[38px] leading-none text-[#111925]">
            Candidate Database
          </h1>

          <p className="mt-4 text-[14px] text-[#7182a1]">
            {candidates.length} candidates across all positions
          </p>
        </div>

        {/* Search + Stage Filter */}
        <div className="mt-11 flex items-center gap-4">

          {/* Search */}
          <div className="relative w-[390px]">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-[#8999b7]">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search by name, role, or skill..."
              className="h-[48px] w-full rounded-xl border border-[#dbe2ee] bg-white pl-12 pr-5 text-[17px] outline-none placeholder:text-[#8999b7] focus:border-[#20366f]"
            />
          </div>

          {/* Stage Tabs */}
          <div className="flex h-[48px] overflow-hidden rounded-xl border border-[#dbe2ee] bg-white">
            {[
              "All",
              "Applied",
              "Screening",
              "Interview",
              "Offered",
              "Hired",
              "Rejected",
            ].map((stage) => (
              <button
                key={stage}
                onClick={() =>
                  setSelectedStage(stage)
                }
                className={`px-3 text-[14px] font-medium transition ${
                  selectedStage === stage
                    ? "bg-[#20366f] text-white"
                    : "text-[#7182a1] hover:bg-[#f5f7fb]"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>

        </div>

        {/* Candidate Table */}
        <div className="mt-7">
          <CandidateTable
            candidates={filteredCandidates}
            onCandidateClick={
              setSelectedCandidate
            }
          />
        </div>

      </main>

      {/* Candidate Profile */}
      {selectedCandidate && (
        <CandidateProfile
          candidate={selectedCandidate}
          onClose={() =>
            setSelectedCandidate(null)
          }
        />
      )}
    </div>
  )
}
export default Candidate