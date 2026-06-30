export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen items-center justify-center px-6 pt-36 pb-16">
        <div className="w-full max-w-3xl rounded-2xl border border-white/20 bg-zinc-950 p-10 text-center">
          <h1 className="mb-6 text-4xl font-semibold uppercase tracking-[0.35em]">
            Checkout
          </h1>

          <p className="mb-10 leading-8 text-gray-400">
            Checkout is almost ready. We’re setting up secure payments so you can complete your order safely.
          </p>

          <a
            href="/cart"
            className="inline-block border border-white px-10 py-4 text-sm uppercase tracking-[0.35em] transition hover:bg-white hover:text-black"
          >
            Back To Cart
          </a>
        </div>
      </section>
    </main>
  );
}