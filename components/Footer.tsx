export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-8 py-16 text-center">
<a href="/">
  <img
    src="/logo.png"
    alt="Yes Lord"
    className="mx-auto w-64 max-w-full"
  />
</a>
        <p className="mt-6 uppercase tracking-[0.3em] text-gray-400">
          Faith • Fashion • Purpose
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm uppercase tracking-[0.2em]">
          <a
            href="https://www.instagram.com/1yeslord?igsh=MXg3aTk3d3hpem5hNQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            Instagram
          </a>

          <a href="/contact" className="hover:text-gray-300">
            Contact
          </a>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <a href="/terms" className="hover:text-white">
            Terms &amp; Conditions
          </a>

          <a href="/privacy" className="hover:text-white">
            Privacy Policy
          </a>

<a href="/shipping" className="hover:text-white">
  Shipping Policy
</a>

          <a href="/return-refund-policy" className="hover:text-white">
            Return & Refund Policy
          </a>
        </div>

        <p className="mt-12 text-xs uppercase tracking-[0.2em] text-gray-500">
          © 2026 Yes Lord. All rights reserved.
        </p>
      </div>
    </footer>
  );
}