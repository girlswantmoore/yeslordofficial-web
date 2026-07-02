export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-8 py-32">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-gray-500">
          Effective Date: July 2, 2026
        </p>

        <h1 className="mb-10 text-5xl font-bold">Terms & Conditions</h1>

        <div className="space-y-10 leading-8 text-gray-300">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Website Use</h2>
            <p>
              By using this website, you represent that you are at least 18 years old
              or have permission from a parent or legal guardian. You agree to use this
              website only for lawful purposes and in accordance with these Terms &
              Conditions.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Product Availability</h2>
            <p>
              We strive to ensure all product descriptions, pricing, colors, and
              inventory are accurate. However, errors may occasionally occur. Yes Lord
              reserves the right to correct pricing errors, update product information,
              limit quantities, discontinue products, or cancel orders at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Intellectual Property</h2>
            <p>
              All content on this website, including logos, graphics, photographs,
              product designs, artwork, text, branding, and other materials, is the
              property of Yes Lord unless otherwise noted. No content may be copied,
              reproduced, distributed, modified, or used commercially without prior
              written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services. Yes
              Lord does not own, control, or endorse those websites and is not
              responsible for their content, policies, or practices.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Yes Lord shall not be liable for
              indirect, incidental, consequential, special, or punitive damages arising
              from your use of our website, products, or services. Our maximum liability
              for any claim shall not exceed the total amount paid for the applicable
              order.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Governing Law</h2>
            <p>
              These Terms & Conditions are governed by the laws of the State of South
              Carolina. Any legal disputes shall be resolved in the appropriate state or
              federal courts located within South Carolina.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Contact Us</h2>
            <p>
              Questions? Contact us at{" "}
              <a href="mailto:service.yeslord@gmail.com" className="text-white underline">
                service.yeslord@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}