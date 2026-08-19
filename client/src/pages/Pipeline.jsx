import { useMemo, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import PipelineBoard, { stages, } from "../components/PipelineBoard"

// === Dummy Candidate Data === 
const initialCandidates = [
  {
    id: 1,
    name: "David Kim",
    position: "DevOps Engineer",
    stage: "Applied",
    rating: 3,
    ratingLabel: "Good",
    skills: ["Kubernetes", "Terraform"],
    appliedDate: "2026-08-10",
    initials: "DK",
  },
  {
    id: 2,
    name: "James O'Brien",
    position: "Senior Frontend Engineer",
    stage: "Applied",
    rating: 4,
    ratingLabel: "Very Good",
    skills: ["React", "TypeScript"],
    appliedDate: "2026-08-12",
    initials: "JO",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    position: "Product Manager",
    stage: "Screening",
    rating: 4,
    ratingLabel: "Very Good",
    skills: ["Product Strategy", "SQL"],
    appliedDate: "2026-08-04",
    initials: "MJ",
  },
  {
    id: 4,
    name: "Thomas Mitchell",
    position: "Backend Engineer",
    stage: "Screening",
    rating: 4,
    ratingLabel: "Very Good",
    skills: ["Go", "PostgreSQL"],
    appliedDate: "2026-08-05",
    initials: "TM",
  },
  {
    id: 5,
    name: "Leo Huang",
    position: "UX Designer",
    stage: "Screening",
    rating: 3,
    ratingLabel: "Good",
    skills: ["Figma", "UX Research"],
    appliedDate: "2026-08-07",
    initials: "LH",
  },
  {
    id: 6,
    name: "Sarah Chen",
    position: "Senior Frontend Engineer",
    stage: "Interview",
    rating: 5,
    ratingLabel: "Excellent",
    skills: ["React", "TypeScript"],
    appliedDate: "2026-08-02",
    initials: "SC",
  },
  {
    id: 7,
    name: "Nadia Sousa",
    position: "Product Manager",
    stage: "Interview",
    rating: 5,
    ratingLabel: "Excellent",
    skills: ["Product Strategy", "Growth"],
    appliedDate: "2026-08-02",
    initials: "NS",
  },
  {
    id: 8,
    name: "Elena Rodriguez",
    position: "UX Designer",
    stage: "Offered",
    rating: 5,
    ratingLabel: "Excellent",
    skills: ["Figma", "User Research"],
    appliedDate: "2026-08-06",
    initials: "ER",
  },
  {
    id: 9,
    name: "Priya Patel",
    position: "Data Analyst",
    stage: "Hired",
    rating: 5,
    ratingLabel: "Excellent",
    skills: ["SQL", "Python"],
    appliedDate: "2026-07-29",
    initials: "PP",
  },
  {
    id: 10,
    name: "Aisha Williams",
    position: "Senior Frontend Engineer",
    stage: "Rejected",
    rating: 2,
    ratingLabel: "Fair",
    skills: ["React", "Vue"],
    appliedDate: "2026-07-30",
    initials: "AW",
  },
]

const activeStages = [
  "Applied",
  "Screening",
  "Interview",
  "Offered",
]

function Pipeline() {

  const [candidates, setCandidates] = useState(initialCandidates)

  const [search, setSearch] = useState("")

  const [selectedPosition, setSelectedPosition] = useState("All Positions")

  const [showRejected, setShowRejected] = useState(false)

  const positions = [
    "All Positions",
    ...new Set(
      candidates.map(
        (candidate) =>
          candidate.position
      )
    ),
  ]

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
            .includes(searchText)

        const matchesPosition =
          selectedPosition ===
            "All Positions" ||
          candidate.position ===
            selectedPosition

        return (
          matchesSearch &&
          matchesPosition
        )
      }
    )
  }, [
    candidates,
    search,
    selectedPosition,
  ])

  const activeCount =
    candidates.filter(
      (candidate) =>
        activeStages.includes(
          candidate.stage
        )
    ).length

  const moveCandidate = (
    candidateId,
    direction
  ) => {
    setCandidates(
      (currentCandidates) =>
        currentCandidates.map(
          (candidate) => {

            if (
              candidate.id !==
              candidateId
            ) {
              return candidate
            }

            const currentIndex =
              stages.findIndex(
                (stage) =>
                  stage.name ===
                  candidate.stage
              )

            const newIndex = currentIndex + direction

            if (
              newIndex < 0 ||
              newIndex >= stages.length
            ) {
              return candidate
            }
            return {
              ...candidate,
              stage:
                stages[newIndex].name,
            }
          }
        )
    )
  }


  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-[270px] min-h-screen">

        {/* Page Header */}
        <div className="border-b border-[#dbe2ee] bg-white px-11 pb-7 pt-8">

          <div className="flex items-start justify-between">
            <div>
              <p className="mb-2 text-[14px] font-semibold uppercase tracking-[0.2em] text-[#ed9413]">
                Hiring Pipeline
              </p>

              <h1 className="font-serif text-[38px] leading-none text-[#111925]">
                Kanban Board
              </h1>
            </div>

            {/* Rejected Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setShowRejected(
                    (current) => !current
                  )
                }
                className={`rounded-xl border px-5 py-2.5 text-[14px] font-medium transition ${
                  showRejected
                    ? "border-[#f0d2d2] bg-[#fff5f5] text-[#d22f2f]"
                    : "border-[#dbe2ee] bg-white text-[#637595] hover:bg-[#f5f7fb]"
                }`}
              >
                {showRejected
                  ? "Hide Rejected"
                  : "Show Rejected"}
              </button>

              <span className="text-[15px] text-[#8b99b3]">
                {activeCount} active
              </span>
            </div>
          </div>


          {/* Search + Filter */}
          <div className="mt-7 flex items-center gap-4">

            <div className="relative w-[314px]">
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
                placeholder="Search candidates..."
                className="h-[48px] w-full rounded-xl border border-[#dbe2ee] bg-[#f8f9fc] pl-12 pr-5 text-[17px] outline-none placeholder:text-[#8999b7] focus:border-[#20366f]"
              />
            </div>

            <select
              value={selectedPosition}
              onChange={(event) =>
                setSelectedPosition(
                  event.target.value
                )
              }
              className="h-[48px] w-[287px] rounded-xl border border-[#dbe2ee] bg-[#f8f9fc] px-5 text-[17px] text-[#171e2b] outline-none focus:border-[#20366f]"
            >
              {positions.map(
                (position) => (

                  <option
                    key={position}
                    value={position}
                  >
                    {position}
                  </option>
                )
              )}

            </select>
          </div>

        </div>

        {/* Kanban Board */}
        <PipelineBoard
          candidates={filteredCandidates}
          showRejected={showRejected}
          onMove={moveCandidate}
        />

      </main>

    </div>
  )
}
export default Pipeline