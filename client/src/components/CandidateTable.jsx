import React from "react"

function CandidateTable({
  candidates,
  onCandidateClick,
}) {

  return (
    <div className="overflow-hidden rounded-2xl border border-[#dbe2ee] bg-white">

      <table className="w-full border-collapse">

        {/* Table Header */}
        <thead>
          <tr className="border-b border-[#dbe2ee] bg-[#f8f9fc]">

            <th className="px-7 py-4 text-left text-[14px] font-semibold uppercase tracking-wide text-[#8a99b5]">
              Candidate
            </th>

            <th className="px-5 py-4 text-left text-[14px] font-semibold uppercase tracking-wide text-[#8a99b5]">
              Position
            </th>

            <th className="px-5 py-4 text-left text-[14px] font-semibold uppercase tracking-wide text-[#8a99b5]">
              Stage
            </th>

            <th className="px-5 py-4 text-left text-[14px] font-semibold uppercase tracking-wide text-[#20366f]">
              Applied 
            </th>

            <th className="px-5 py-4 text-left text-[14px] font-semibold uppercase tracking-wide text-[#8a99b5]">
              Rating
            </th>

            <th className="px-7 py-4 text-left text-[14px] font-semibold uppercase tracking-wide text-[#8a99b5]">
              Skills
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {candidates.map(
            (candidate) => (

              <CandidateRow
                key={candidate.id}
                candidate={candidate}
                onCandidateClick={
                  onCandidateClick
                }
              />

            )
          )}
        </tbody>

      </table>

      {/* Empty State */}
      {candidates.length === 0 && (
        <div className="flex min-h-[180px] items-center justify-center text-[14px] text-[#8999b7]">
          No candidates found.
        </div>
      )}
    </div>
  )
}

function CandidateRow({
  candidate,
  onCandidateClick,
}) {

  return (
    <tr className="border-b border-[#edf0f5] transition last:border-b-0 hover:bg-[#fafbfc]">

      {/* Candidate */}
      <td className="px-7 py-5">
        <div className="flex items-center gap-4">

          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#edf1f8] text-[13px] font-semibold text-[#20366f]">
            {candidate.initials}
          </div>

          <div className="min-w-0">
            <button
              onClick={() =>
                onCandidateClick(
                  candidate
                )
              }
              className="text-left text-[14px] font-semibold text-[#172033] hover:text-[#ed9413] hover:underline"
            >
              {candidate.name}
            </button>

            <p className="mt-0.5 text-[13px] text-[#8292af]">
              {candidate.location}
            </p>
          </div>

        </div>
      </td>

      {/* Position */}
      <td className="px-5 py-5">
        <p className="max-w-[210px] text-[14px] leading-6 text-[#6d7e9e]">
          {candidate.position}
        </p>
      </td>

      {/* Stage */}
      <td className="px-5 py-5">
        <StageBadge
          stage={candidate.stage}
        />
      </td>

      {/* Applied Date */}
      <td className="px-5 py-5">
        <span className="font-mono text-[14px] text-[#8797b4]">
          {candidate.appliedDate}
        </span>
      </td>

      {/* Rating */}
      <td className="px-5 py-5">

        <div className="flex items-center whitespace-nowrap">
          {[1, 2, 3, 4, 5].map(
            (star) => (

              <span
                key={star}
                className={`text-[16px] ${
                  star <= candidate.rating
                    ? "text-[#ed9413]"
                    : "text-[#d9dfeb]"
                }`}
              >
                ★
              </span>

            )
          )}
        </div>

      </td>

      {/* Skills */}
      <td className="px-7 py-5">

        <div className="flex max-w-[330px] flex-wrap items-center gap-1.5">
          {candidate.skills
            .slice(0, 3)
            .map((skill) => (

              <span
                key={skill}
                className="whitespace-nowrap rounded-md bg-[#eef1f7] px-2.5 py-1 text-[14px] text-[#435474]"
              >
                {skill}
              </span>

            ))}

          {candidate.skills.length > 3 && (

            <span className="ml-0.5 text-[14px] font-medium text-[#8494b2]">
              +{candidate.skills.length - 3}
            </span>

          )}
        </div>

      </td>

    </tr>
  )
}

function StageBadge({
  stage,
}) {
  const styles = {
    Applied:
      "bg-[#edf4ff] text-[#326ce0]",

    Screening:
      "bg-[#f0ebff] text-[#7b4ee4]",

    Interview:
      "bg-[#fff1d9] text-[#c56e09]",

    Offered:
      "bg-[#e4faf2] text-[#08775c]",

    Hired:
      "bg-[#d9f8ec] text-[#08775c]",

    Rejected:
      "bg-[#ffeaea] text-[#c62f2f]",
  }

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[14px] font-medium ${
        styles[stage]
      }`}
    >
      {stage}
    </span>
  )
}
export default CandidateTable