import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password, order } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const address = order.customer?.address;

  if (!address) {
    return NextResponse.json(
      { error: "Missing customer shipping address." },
      { status: 400 }
    );
  }

  const shippoHeaders = {
    Authorization: `ShippoToken ${process.env.SHIPPO_API_KEY}`,
    "Content-Type": "application/json",
    "SHIPPO-API-VERSION": "2018-02-08",
  };

  const shipmentResponse = await fetch("https://api.goshippo.com/shipments/", {
    method: "POST",
    headers: shippoHeaders,
    body: JSON.stringify({
      address_from: {
        name: "Yes Lord",
        company: "Yes Lord",
        street1: "427 Hampton St.",
        city: "Rock Hill",
        state: "SC",
        zip: "29730",
        country: "US",
        phone: "7049689085",
        email: "service.yeslord@gmail.com",
      },
      address_to: {
        name: order.customer?.name,
        street1: address.line1,
        street2: address.line2 || "",
        city: address.city,
        state: address.state,
        zip: address.postal_code,
        country: address.country || "US",
        phone: order.customer?.phone || "7049689085",
        email: order.customer?.email,
      },
      parcels: [
        {
          length: "14.5",
          width: "19",
          height: "1",
          distance_unit: "in",
          weight: "10",
          mass_unit: "oz",
        },
      ],
      async: false,
    }),
  });

  const shipment = await shipmentResponse.json();

  if (!shipmentResponse.ok || !shipment.rates?.length) {
    return NextResponse.json(
      { error: "Could not get shipping rates.", details: shipment },
      { status: 400 }
    );
  }

  const preferredRate =
    shipment.rates.find(
      (rate: any) =>
        rate.provider === "USPS" &&
        rate.servicelevel?.name?.toLowerCase().includes("ground")
    ) || shipment.rates[0];

  const transactionResponse = await fetch(
    "https://api.goshippo.com/transactions/",
    {
      method: "POST",
      headers: shippoHeaders,
      body: JSON.stringify({
        rate: preferredRate.object_id,
        async: false,
        label_file_type: "PDF",
      }),
    }
  );

  const transaction = await transactionResponse.json();

  if (!transactionResponse.ok || transaction.object_status !== "SUCCESS") {
    return NextResponse.json(
      { error: "Could not purchase label.", details: transaction },
      { status: 400 }
    );
  }

  return NextResponse.json({
    labelUrl: transaction.label_url,
    trackingNumber: transaction.tracking_number,
    carrier: preferredRate.provider,
    service: preferredRate.servicelevel?.name,
    amount: preferredRate.amount,
  });
}