function QuickAction({ icon, title }) {
  return (
    <button className="flex h-[75px] items-center gap-6 rounded-2xl border border-[#dbe2ee] bg-white px-7 text-left transition hover:-translate-y-0.5 hover:shadow-sm">
      <span className="text-[28px]">{icon}</span>

      <span className="text-[18px] font-semibold text-[#171e2b]">
        {title}
      </span>
    </button>
  )
}

export default QuickAction