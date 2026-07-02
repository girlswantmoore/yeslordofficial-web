import { products } from "../data/products";

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <img
          src="/mainpage.jpeg"
          alt="Yes Lord hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

<div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-24 text-center md:pt-0">          <img
            src="/logo.png"
            alt="Yes Lord"
            className="w-[90%] max-w-[850px] drop-shadow-2xl"
          />

          <p className="mt-8 uppercase tracking-[0.45em] text-gray-300">
            Faith • Fashion • Purpose
          </p>
<p className="mt-16 text-xs uppercase tracking-[0.5em] text-gray-400">
  Scroll
</p>

<div className="mt-2 animate-bounce text-2xl text-white/70">
  ↓
</div>
        </div>
      </section>

      {/* Shop */}
      <section
        id="shop"
        className="scroll-mt-32 px-8 pt-36 pb-28"
      >
        <h1 className="mb-16 text-center text-5xl font-bold tracking-[0.35em]">
          SHOP
        </h1>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <a
              key={product.slug}
              href={`/shop/${product.slug}`}
className="group"            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-lg">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              <h2 className="mt-2 text-xl font-semibold group-hover:text-gray-300">
                {product.name}
              </h2>
            </a>
          ))}
        </div>
      </section>
      <section className="border-t border-zinc-800 px-8 py-24 text-center">
  <div className="mx-auto max-w-2xl">
    <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gray-500">
      Stay Updated
    </p>

    <h2 className="mb-6 text-4xl font-bold">
      Join the Email List
    </h2>

    <p className="mb-10 leading-8 text-gray-400">
      Be the first to know about restocks, new drops, and exclusive updates.
    </p>

    <form className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 border border-zinc-700 bg-black px-5 py-4 text-white outline-none placeholder:text-gray-600 focus:border-white"
      />

      <button
        type="submit"
        className="bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-gray-200"
      >
        Join
      </button>
    </form>
  </div>
</section>
    </main>
  );
}