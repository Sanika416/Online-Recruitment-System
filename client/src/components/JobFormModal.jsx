import React from "react"

function JobFormModal({
  formData,
  editingJob,
  onChange,
  onSubmit,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1523]/60 p-6">

      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Fixed Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#e5e9f0] px-8 py-6">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ed9413]">
              {editingJob ? "Manage" : "Create"}
            </p>

            <h2 className="mt-1 font-serif text-[28px] text-[#111925]">
              {editingJob
                ? "Edit Job Posting"
                : "New Job Posting"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#7184a8] transition hover:bg-[#f2f4f8]"
          >
            ×
          </button>

        </div>

        {/* Scrollable Form Area */}
        <div className="min-h-0 flex-1 overflow-y-auto">

          <form
            id="job-form"
            onSubmit={onSubmit}
            className="grid grid-cols-2 gap-5 p-8"
          >

            {/* Job Title */}
            <FormField
              label="Job Title"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="e.g. Senior Frontend Engineer"
              required
            />

            {/* Department */}
            <FormField
              label="Department"
              name="department"
              value={formData.department}
              onChange={onChange}
              placeholder="e.g. Engineering"
              required
            />

            {/* Employment Type */}
            <SelectField
              label="Employment Type"
              name="type"
              value={formData.type}
              onChange={onChange}
              options={[
                "Full-time",
                "Part-time",
                "Contract",
                "Remote",
              ]}
            />

            {/* Level */}
            <SelectField
              label="Level"
              name="level"
              value={formData.level}
              onChange={onChange}
              options={[
                "Junior",
                "Mid",
                "Senior",
                "Lead",
              ]}
            />

            {/* Location */}
            <FormField
              label="Location"
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="e.g. Mumbai, India"
              required
            />

            {/* Salary */}
            <FormField
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={onChange}
              placeholder="e.g. ₹8L–₹12L"
              required
            />

            {/* Screening Questions */}
            <FormField
              label="Screening Questions"
              name="screeningQuestions"
              type="number"
              min="0"
              value={formData.screeningQuestions}
              onChange={onChange}
            />

            {/* Closing Date */}
            <FormField
              label="Closing Date"
              name="closes"
              type="date"
              value={formData.closes}
              onChange={onChange}
              required
            />

            {/* Status */}
            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={onChange}
              options={[
                "Active",
                "Draft",
                "Closed",
              ]}
            />

          </form>

        </div>

        {/* Fixed Footer */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-[#e5e9f0] bg-white px-8 py-5">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#dbe2ee] px-6 py-3 font-semibold text-[#7184a8] transition hover:bg-[#f5f7fb]"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="job-form"
            className="rounded-xl bg-[#20366f] px-7 py-3 font-semibold text-white transition hover:bg-[#172c60]"
          >
            {editingJob
              ? "Save Changes"
              : "Create Job"}
          </button>

        </div>

      </div>

    </div>
  )
}

// ===== Reusable Form Input ===== 
function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  required = false,
}) {
  return (
    <label className="flex flex-col gap-2">

      <span className="text-sm font-semibold text-[#293750]">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        required={required}
        className="h-12 rounded-xl border border-[#dbe2ee] px-4 text-[15px] outline-none placeholder:text-[#9aa8be] transition focus:border-[#20366f] focus:ring-2 focus:ring-[#20366f]/10"
      />

    </label>
  )
}

// ===== Reusable Select ===== 
function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label className="flex flex-col gap-2">

      <span className="text-sm font-semibold text-[#293750]">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-12 rounded-xl border border-[#dbe2ee] bg-white px-4 text-[15px] outline-none transition focus:border-[#20366f] focus:ring-2 focus:ring-[#20366f]/10"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

    </label>
  )
}

export default JobFormModal