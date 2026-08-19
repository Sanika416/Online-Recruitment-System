export const stages = [
  {
    name: "Applied",
    dot: "bg-[#3d82ed]",
    header: "bg-[#dbeaff]",
    text: "text-[#326ce0]",
    count: "bg-[#c6dbf8]",
  },
  {
    name: "Screening",
    dot: "bg-[#8757ed]",
    header: "bg-[#eee8ff]",
    text: "text-[#7b4ee4]",
    count: "bg-[#ddd3f6]",
  },
  {
    name: "Interview",
    dot: "bg-[#ed9413]",
    header: "bg-[#ffe68f]",
    text: "text-[#c56e09]",
    count: "bg-[#efd26d]",
  },
  {
    name: "Offered",
    dot: "bg-[#11b887]",
    header: "bg-[#a9efd4]",
    text: "text-[#08775c]",
    count: "bg-[#91dfc2]",
  },
  {
    name: "Hired",
    dot: "bg-[#0aa879]",
    header: "bg-[#6eddb6]",
    text: "text-[#08664f]",
    count: "bg-[#58cda7]",
  },
  {
    name: "Rejected",
    dot: "bg-[#ed4b4b]",
    header: "bg-[#ffcaca]",
    text: "text-[#c62f2f]",
    count: "bg-[#efb1b1]",
  },
]

function PipelineBoard({candidates, showRejected, onMove}) {
  return (
    <div className="overflow-x-auto px-7 py-7">

      <div className="flex min-w-max gap-5">
        {stages.filter((stage) => {

            if (
              stage.name === "Rejected" 
            ) {
              return showRejected
            }
            return true
          })
          .map((stage) => {
            const stageCandidates =
              candidates.filter(
                (candidate) =>
                  candidate.stage ===
                  stage.name
              )

            return (
              <PipelineColumn
                key={stage.name}
                stage={stage}
                candidates={stageCandidates}
                onMove={onMove}
              />
            )
          })}
      </div>

    </div>
  )
}

function PipelineColumn({
  stage,
  candidates,
  onMove,
}) {

  return (
    <div className="flex w-[314px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-[#dbe2ee] bg-[#f4f6fa]">

      {/* Column Header */}
      <div className={`flex h-[57px] items-center justify-between px-5 ${stage.header}`}>

        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${stage.dot}`}/>

          <span className={`text-[14px] font-bold uppercase tracking-wide ${stage.text}`}>
            {stage.name}
          </span>
        </div>

        <span
          className={`rounded-md px-2.5 py-1 text-[13px] font-semibold ${stage.count} ${stage.text}`}
        >
          {candidates.length}
        </span>

      </div>

      {/* Candidate Cards */}
      <div className="min-h-[525px] space-y-3 p-3">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onMove={onMove}
          />
        ))}

        {candidates.length === 0 && (
          <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-[#d3dbe8] text-sm text-[#94a1b8]">
            No candidates
          </div>
        )}
      </div>

    </div>
  )
}

function CandidateCard({
  candidate,
  onMove,
}) {

  const currentStageIndex =
    stages.findIndex(
      (stage) =>
        stage.name === candidate.stage
    )

  const isFirstStage =
    currentStageIndex === 0

  const isLastStage =
    currentStageIndex ===
    stages.length - 1


  const avatarStyles = {
    Applied:
      "bg-[#edf4ff] text-[#326ce0]",

    Screening:
      "bg-[#f2edff] text-[#7b4ee4]",

    Interview:
      "bg-[#fff3df] text-[#c56e09]",

    Offered:
      "bg-[#e7faf3] text-[#08775c]",

    Hired:
      "bg-[#d9f8ec] text-[#08775c]",

    Rejected:
      "bg-[#fff0f0] text-[#d22f2f]",
  }

  return (
    <div className="rounded-xl border border-[#dbe2ee] bg-white p-4 shadow-sm">

      {/* Candidate Identity */}
      <div className="flex items-center gap-3">

        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
            avatarStyles[candidate.stage]
          }`}
        >
          {candidate.initials}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[14px] font-semibold text-[#171e2b]">
            {candidate.name}
          </h3>

          <p className="truncate text-[13px] text-[#8494b2]">
            {candidate.position}
          </p>
        </div>

      </div>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-2">

        <div className="flex text-[14px] tracking-tight">
          {[1, 2, 3, 4, 5].map(
            (star) => (
              <span
                key={star}
                className={
                  star <= candidate.rating
                    ? "text-[#ed9413]"
                    : "text-[#d9dfeb]"
                }
              >
                ★
              </span>
            )
          )}
        </div>

        <span className="text-[13px] text-[#8494b2]">
          {candidate.ratingLabel}
        </span>

      </div>

      {/* Skills */}
      <div className="mt-3 flex flex-wrap gap-2">
        {candidate.skills.map(
          (skill) => (
            <span
              key={skill}
              className="rounded-md bg-[#eef1f7] px-2.5 py-1 text-[13px] text-[#435474]"
            >
              {skill}
            </span>
          )
        )}
      </div>

      {/* Date + Movement */}
      <div className="mt-3 flex items-center justify-between">

        <span className="font-mono text-[13px] text-[#8b9bb8]">
          {candidate.appliedDate}
        </span>

        <div className="flex items-center gap-1.5">

          {/* Move Left */}
          <button
            disabled={isFirstStage}
            onClick={() =>
              onMove(
                candidate.id,
                -1
              )
            }
            className={`flex h-7 w-7 items-center justify-center rounded-md text-[14px] transition ${
              isFirstStage
                ? "cursor-not-allowed bg-[#f3f5f8] text-[#c7cfdb]"
                : "bg-[#edf1f7] text-[#50617f] hover:bg-[#dfe5ef]"
            }`}
          >
            ←
          </button>

          {/* Move Right */}
          <button
            disabled={isLastStage}
            onClick={() =>
              onMove(
                candidate.id,
                1
              )
            }
            className={`flex h-7 w-7 items-center justify-center rounded-md text-[14px] transition ${
              isLastStage
                ? "cursor-not-allowed bg-[#f3f5f8] text-[#c7cfdb]"
                : "bg-[#edf1f7] text-[#50617f] hover:bg-[#dfe5ef]"
            }`}
          >
            →
          </button>

        </div>

      </div>

    </div>
  )
}
export default PipelineBoard