import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden">
      {/* Glowing background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/40 via-teal-500/440 to-cyan-400/40 rounded-2xl blur-2xl animate-pulse z-0" />

      {/* Foreground content */}
      {/* <div className="relative z-10 bg-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-white space-y-6">
        <h1 className="text-2xl font-bold">Welcome to My Page</h1>
        <p>This is a basic Next.js page with a glowing gradient background.</p>
      </div> */}
    </main>
  );
}
