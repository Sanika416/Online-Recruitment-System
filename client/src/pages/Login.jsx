import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    // Temporary dummy authentication
    setTimeout(() => {
      if (
        email === "admin@talentbridge.com" &&
        password === "admin123"
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "HR Administrator",
            email,
            role: "admin",
          })
        )

        navigate("/dashboard")
        return
      }

      if (
        email === "applicant@talentbridge.com" &&
        password === "applicant123"
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "Applicant",
            email,
            role: "applicant",
          })
        )

        navigate("/applicant")
        return
      }

      setError("Invalid email or password.")
      setLoading(false)
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      <div className="flex min-h-screen">

        {/* Left Branding Section */}
        <div className="hidden w-[48%] bg-[#0d1523] lg:flex lg:flex-col lg:justify-between">

          {/* Logo */}
          <div className="px-12 pt-10">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f29a12]">

                <div className="grid grid-cols-2 gap-1">
                  <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                </div>

              </div>

              <div>
                <h1 className="text-[18px] font-semibold tracking-tight text-white">
                  TalentBridge
                </h1>

                <p className="text-[13px] text-[#7083a8]">
                  Online Recruitment System
                </p>
              </div>

            </div>

          </div>

          {/* Main Branding */}
          <div className="px-16">
            <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.25em] text-[#f29a12]">
              TalentBridge
            </p>

            <h2 className="max-w-[520px] font-serif text-[42px] leading-[1.08] text-white">
              Connecting great
              <br />
              talent with great
              <br />
              opportunities.
            </h2>

            <p className="mt-7 max-w-[470px] text-[17px] leading-7 text-[#8d9dbc]">
              A smarter way to discover talent, manage hiring
              pipelines and build the teams of tomorrow.
            </p>
          </div>


          {/* Bottom */}
          <div className="px-12 pb-10">

            <div className="h-px w-full bg-[#202b3d]" />

            <p className="mt-5 text-[13px] text-[#536684]">
              © 2026 TalentBridge. All rights reserved.
            </p>

          </div>

        </div>

        {/* Right Login Section */}
        <div className="flex flex-1 items-center justify-center px-6 py-10">

          <div className="w-full max-w-[440px]">

            {/* Mobile Logo */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f29a12]">
                <div className="grid grid-cols-2 gap-1">
                  <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                </div>
              </div>

              <div>
                <h1 className="text-[21px] font-semibold text-[#172033]">
                  TalentBridge
                </h1>

                <p className="text-[13px] text-[#7182a1]">
                  Online Recruitment System
                </p>
              </div>

            </div>

            {/* Heading */}
            <div className="mb-9">
              <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.22em] text-[#f29a12]">
                Welcome back
              </p>

              <h2 className="font-serif text-[43px] leading-tight text-[#111925]">
                Sign in
              </h2>

              <p className="mt-3 text-[16px] leading-6 text-[#7182a1]">
                Sign in to continue to your TalentBridge account.
              </p>
            </div>

            {/* Login Card */}
            <div className="rounded-2xl border border-[#dce3ee] bg-white p-8 shadow-[0_10px_40px_rgba(23,32,51,0.05)]">
              <form onSubmit={handleLogin}>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-[14px] font-semibold text-[#435474]">
                    Email address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    required
                    className="h-[52px] w-full rounded-lg border border-[#d8e0ec] bg-white px-4 text-[15px] text-[#172033] outline-none transition placeholder:text-[#9aa7bd] focus:border-[#20366f] focus:ring-2 focus:ring-[#20366f]/10"
                  />
                </div>

                {/* Password */}
                <div className="mt-5">

                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-[14px] font-semibold text-[#435474]">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-[13px] font-medium text-[#20366f] hover:text-[#f29a12]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      required
                      className="h-[52px] w-full rounded-lg border border-[#d8e0ec] bg-white px-4 pr-12 text-[15px] text-[#172033] outline-none transition placeholder:text-[#9aa7bd] focus:border-[#20366f] focus:ring-2 focus:ring-[#20366f]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#7182a1] hover:text-[#20366f]"
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>
                  </div>

                </div>

                {/* Error */}
                {error && (
                  <div className="mt-4 rounded-lg border border-[#f4cccc] bg-[#fff5f5] px-4 py-3 text-[13px] text-[#c53b3b]">
                    {error}
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 flex h-[52px] w-full items-center justify-center rounded-lg bg-[#20366f] text-[15px] font-semibold text-white transition hover:bg-[#182b5c] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading
                    ? "Signing in..."
                    : "Sign in"}
                </button>

              </form>

              {/* Register */}
              <div className="mt-7 border-t border-[#edf0f5] pt-6 text-center">

                <p className="text-[14px] text-[#7182a1]">
                  Don't have an account?
                  <button
                    type="button"
                    className="ml-1 font-semibold text-[#20366f] hover:text-[#f29a12]"
                  >
                    Create an account
                  </button>
                </p>

              </div>

            </div>

            {/* Demo Credentials */}
            <div className="mt-5 rounded-xl border border-[#e4e8ef] bg-[#f8f9fc] px-5 py-4">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-[#8a98b2]">
                Temporary demo credentials
              </p>

              <div className="mt-2 space-y-1 text-[12px] text-[#7182a1]">
                <p>
                  <span className="font-semibold text-[#435474]">
                    Admin:
                  </span>{" "}
                  admin@talentbridge.com / admin123
                </p>

                <p>
                  <span className="font-semibold text-[#435474]">
                    Applicant:
                  </span>{" "}
                  applicant@talentbridge.com / applicant123
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
export default Login