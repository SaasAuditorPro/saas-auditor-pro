import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen grid-bg flex items-center justify-center px-8">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="font-syne font-extrabold text-3xl text-white mb-3">
          You&apos;re on Basic!
        </h1>
        <p className="font-dm text-zinc-400 mb-8">
          Welcome to SaaS Auditor Pro. Run unlimited audits and start saving money today.
        </p>
        <Link
          href="/audit"
          className="inline-block bg-emerald-400 hover:bg-emerald-300 text-black font-syne font-bold px-8 py-4 rounded-xl transition-all glow"
        >
          Run Your First Audit →
        </Link>
      </div>
    </main>
  );
}
