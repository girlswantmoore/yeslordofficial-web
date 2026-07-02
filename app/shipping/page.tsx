export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-8 py-32">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-gray-500">
          Effective Date: July 2, 2026
        </p>

        <h1 className="mb-10 text-5xl font-bold">Shipping Policy</h1>

        <div className="space-y-10 leading-8 text-gray-300">

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Order Processing
            </h2>

            <p>
              Orders begin processing immediately after they are placed.
              Because of this, cancellations or order modifications cannot be
              guaranteed once checkout has been completed.
            </p>

            <div className="mt-6 space-y-2">
              <p>Domestic (U.S.) Orders: 3–5 business days</p>
              <p>International Orders: 5–7 business days</p>
            </div>

            <p className="mt-6">
              Processing times do not include weekends, holidays, or shipping
              carrier transit times. During product launches, promotions,
              holidays, or periods of unusually high order volume, processing
              times may be extended.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Shipping Confirmation & Tracking
            </h2>

            <p>
              Once your order ships, you will receive a confirmation email
              containing your tracking information. Please allow up to 24 hours
              for tracking updates to become available after receiving your
              shipping confirmation.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Shipping Address
            </h2>

            <p>
              Please carefully verify your shipping address before placing your
              order. To help protect our customers from fraud, Yes Lord ships
              only to the address provided during checkout.
            </p>

            <p className="mt-4">
              Once an order has been placed, we cannot guarantee changes to the
              shipping address. Yes Lord is not responsible for delays, lost
              shipments, or returned packages resulting from an incorrect or
              incomplete address provided by the customer.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Domestic Shipping
            </h2>

            <p>
              We currently ship throughout the United States using trusted
              shipping carriers. Delivery times vary depending on the shipping
              option selected at checkout and the destination.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              International Shipping
            </h2>

            <p>
              Yes Lord offers international shipping to select countries through
              DHL Express where available.
            </p>

            <p className="mt-4">
              International customers are responsible for any customs duties,
              import taxes, VAT, brokerage fees, or other charges imposed by
              their country's customs agency unless otherwise stated at
              checkout.
            </p>

            <p className="mt-4">
              If an international shipment is refused or abandoned, all shipping
              charges, customs duties, taxes, and carrier fees are
              non-refundable.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Lost or Stolen Packages
            </h2>

            <p>
              Once a package has been marked as delivered by the shipping
              carrier, Yes Lord is not responsible for lost or stolen packages.
            </p>

            <p className="mt-4">
              If your package appears to be lost during transit, please contact
              us as soon as possible. We are happy to assist you in initiating a
              claim with the shipping carrier whenever possible.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Risk of Loss
            </h2>

            <p>
              All purchases are made pursuant to a shipment contract. Ownership
              and risk of loss transfer to the customer once the order has been
              delivered to the shipping carrier.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Multiple Orders
            </h2>

            <p>
              Orders placed separately cannot be combined after checkout.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Contact Us
            </h2>

            <p>
              If you have any questions regarding shipping or your order,
              please contact us at{" "}
              <a
                href="mailto:service.yeslord@gmail.com"
                className="underline text-white"
              >
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