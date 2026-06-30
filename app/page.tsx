export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative h-screen overflow-hidden">
        <img
          src="/mainpage.jpeg"
          alt="Yes Lord hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <img
            src="/logo.png"
            alt="Yes Lord"
            className="w-[90%] max-w-[850px] drop-shadow-2xl"
          />

          <p className="mt-8 uppercase tracking-[0.45em] text-gray-300">
            Faith • Fashion • Purpose
          </p>

          <a
            href="/shop"
            className="mt-12 border border-white px-10 py-4 uppercase tracking-[0.35em] transition hover:bg-white hover:text-black"
          >
            Shop Collection
          </a>
        </div>
      </section>
    </main>
  );
}