import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7C4DFF]/10 to-[#4D9FFF]/10">
      <SignIn />
    </div>
  )
}