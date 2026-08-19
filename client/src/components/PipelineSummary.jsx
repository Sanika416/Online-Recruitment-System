function PipelineSummary({ data }) {
  const barColors = {
    blue: "bg-[#4388f7]",
    purple: "bg-[#8955f5]",
    orange: "bg-[#ef9410]",
    green: "bg-[#0db17b]",
    red: "bg-[#f04747]",
  }

  return (
    <section className="rounded-2xl border border-[#dbe2ee] bg-white p-6">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-[#151d2b]">
          Pipeline Summary
        </h2>

        <button className="text-[14px] font-medium text-[#ee9411]">
          View pipeline →
        </button>
      </div>

      <div className="space-y-5">
        {data.map((item) => (
          <div
            key={item.stage}
            className="grid grid-cols-[120px_1fr_30px] items-center gap-5"
          >
            <span className="text-[14px] font-medium text-[#7184a8]">
              {item.stage}
            </span>

            <div className="h-2 overflow-hidden rounded-full bg-[#edf1f7]">
              <div
                className={`h-full rounded-full ${barColors[item.type]}`}
                style={{ width: item.width }}
              />
            </div>

            <span className="text-right text-[14px] font-medium text-[#172033]">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PipelineSummary