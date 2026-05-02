import { LoginCard } from "@/components/auth/LoginCard";
import { DecorCircles } from "@/components/shared/DecorCircles";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <DecorCircles />
      <div className="relative z-10 w-full max-w-[380px]">
        <LoginCard />
      </div>
    </main>
  );
}
