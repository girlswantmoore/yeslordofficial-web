export default function ContactPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white"
      style={{ backgroundImage: "url('/hero.jpeg')" }}
    >
      <section className="min-h-screen bg-black/70 flex items-center justify-center px-6 pt-36 pb-16">
        <div className="w-full max-w-3xl rounded-2xl border border-white/20 bg-black/60 p-10 text-center backdrop-blur-sm">
          <img src="/logo.png" alt="Yes Lord" className="mx-auto mb-10 w-44" />

          <h1 className="mb-6 text-4xl font-semibold uppercase tracking-[0.35em]">
            Contact
          </h1>

          <p className="mb-12 text-gray-300 leading-8">
            We'd love to hear from you. Whether you have questions about an
            order, sizing, collaborations, or simply want to connect with the
            brand, reach out anytime.
          </p>

          <div className="space-y-8 text-lg">
            <div>
              <p className="mb-2 uppercase tracking-[0.3em] text-gray-400">
                Email
              </p>
              <a
                href="mailto:Service.yeslord@gmail.com"
                className="text-2xl hover:opacity-70 transition"
              >
                Service.yeslord@gmail.com
              </a>
            </div>

            <div>
              <p className="mb-2 uppercase tracking-[0.3em] text-gray-400">
                Instagram
              </p>
              <a
                href="https://www.instagram.com/1yeslord?igsh=MXg3aTk3d3hpem5hNQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:opacity-70 transition"
              >
                @1yeslord
              </a>
            </div>
          </div>

          <p className="mt-16 uppercase tracking-[0.45em] text-gray-400">
            Faith • Fashion • Purpose
          </p>
        </div>
      </section>
    </main>
  );
}