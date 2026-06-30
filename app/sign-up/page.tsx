import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7C4DFF]/10 to-[#4D9FFF]/10">
      <SignUp />
    </div>
  )
}