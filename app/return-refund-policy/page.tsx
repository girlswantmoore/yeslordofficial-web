export default function ReturnRefundPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-8 py-32">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-gray-500">
          Effective Date: July 2, 2026
        </p>

        <h1 className="mb-10 text-5xl font-bold">
          Return & Refund Policy
        </h1>

        <div className="space-y-10 leading-8 text-gray-300">

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Return Policy
            </h2>

            <p>
              At Yes Lord, we are committed to providing high-quality apparel
              and exceptional customer service. If you are not completely
              satisfied with your purchase, you may request a return within
              <strong> 15 days of delivery</strong>.
            </p>

            <p className="mt-4">
              Approved returns are issued as store credit in the form of a Yes
              Lord Gift Card. Store credit may be used toward future purchases
              or size exchanges.
            </p>

            <p className="mt-4">
              Exchanges are available for sizing only and are subject to
              inventory availability. If your requested size is unavailable,
              store credit will be issued instead.
            </p>

            <p className="mt-4">
              Please allow 5–7 business days for your return to be processed
              after it has been received and inspected by our Fulfillment
              Center.
            </p>

            <p className="mt-4">
              To begin a return, contact us through our Contact page or email{" "}
              <a
                href="mailto:service.yeslord@gmail.com"
                className="underline text-white"
              >
                service.yeslord@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Return Eligibility
            </h2>

            <p>Returned items must:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Be unworn, unwashed, and undamaged.</li>
              <li>Be free of stains, odors, or signs of wear.</li>
              <li>Include all original tags attached.</li>
              <li>Be returned in their original packaging.</li>
              <li>Include the original packing slip or order confirmation.</li>
            </ul>

            <p className="mt-4">
              Failure to include the required documentation may delay
              processing. Yes Lord reserves the right to deny any return that
              does not meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Return Process
            </h2>

            <ol className="list-decimal space-y-3 pl-6">
              <li>Securely package your item(s).</li>
              <li>Include your original packing slip or order confirmation.</li>
              <li>Clearly identify the item(s) being returned.</li>
              <li>
                A prepaid return shipping label will be generated upon approval
                of your return or exchange request.
              </li>
            </ol>

            <p className="mt-4">
              Please retain your shipment receipt and tracking information until
              your return has been fully processed.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Inspection Process
            </h2>

            <p>
              All returned merchandise is inspected by our Fulfillment Center
              Quality Control team.
            </p>

            <p className="mt-4">
              Items that are worn, washed, damaged, altered, or otherwise
              ineligible for return will not qualify for store credit or
              exchange and may be returned to the customer at the customer's
              expense.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Final Sale Items
            </h2>

            <p>
              For hygiene and safety reasons, the following items are Final Sale
              and cannot be returned or exchanged:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Hats</li>
              <li>Socks</li>
              <li>Accessories</li>
              <li>Any item marked "Final Sale"</li>
            </ul>

            <p className="mt-4">
              Any non–Yes Lord merchandise received at our Fulfillment Center
              will be discarded.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Defective or Incorrect Items
            </h2>

            <p>
              If you receive a defective or incorrect item, please contact us
              within 7 days of delivery and include photographs of the product
              so we can resolve the issue as quickly as possible.
            </p>

            <p className="mt-4">
              Eligible defective or incorrect items may receive a replacement,
              exchange, store credit, or refund at Yes Lord's discretion.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}