import { Hero, About, Projects, Services, Contact } from "@/components/sections";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />

      {/* Global Background Effects (same as Hero) */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.06] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500 opacity-[0.04] blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-[var(--accent)]/10 via-transparent to-purple-500/10 blur-[100px] rounded-full animate-slow-spin" />

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </main>
  );
}
