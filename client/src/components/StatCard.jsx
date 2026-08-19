function StatCard({ title, value, label, type }) {
  const valueClass =
    type === "success"
      ? "text-[#08a96d]"
      : type === "warning"
        ? "text-[#ed9413]"
        : "text-[#213a78]"

  const labelClass =
    type === "success"
      ? "bg-[#d7f8e9] text-[#08a96d]"
      : type === "warning"
        ? "bg-[#fff1dd] text-[#ed9413]"
        : "bg-[#eef2fa] text-[#213a78]"

  return (
    <div className="rounded-2xl border border-[#dbe2ee] bg-white px-7 py-7">
      <p className="text-[16px] font-medium text-[#7184a8]">
        {title}
      </p>

      <p className={`mt-5 text-[42px] font-semibold leading-none ${valueClass}`}>
        {value}
      </p>

      <span
        className={`mt-5 inline-block rounded-full px-3 py-1 text-[13px] font-semibold ${labelClass}`}
      >
        {label}
      </span>
    </div>
  )
}

export default StatCard