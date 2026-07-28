import { GlowingEffect } from "./ui/glowing-effect";

type FeaturedProduct = {
  slug: string;
  name: string;
  price: number;
  thumbnail: string;
};

export default function FeaturedProducts({
  products,
}: {
  products: FeaturedProduct[];
}) {
  return (
    <div className="mx-auto mb-16 grid max-w-2xl grid-cols-1 gap-5 md:grid-cols-2">
      {products.map((product) => (
        <a
          key={product.slug}
          href={`/shop/${product.slug}`}
          className="group relative rounded-2xl border border-white/10 bg-[#090909] p-1.5"
        >
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div className="relative overflow-hidden rounded-xl bg-white">
            <div className="absolute left-4 top-4 z-10 rounded-full bg-black px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white">
              New arrival
            </div>
            <div className="aspect-[5/6] overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.name}
                className={`h-full w-full object-contain transition duration-500 ${
                  product.slug === "wave-runner-long-sleeve"
                    ? "scale-[1.65] group-hover:scale-[1.72]"
                    : "group-hover:scale-105"
                }`}
              />
            </div>
          </div>
          <div className="relative px-2.5 pb-2.5">
            <h2 className="mt-3 text-lg font-semibold transition group-hover:text-[#9FD6CC]">
              {product.name}
            </h2>
            <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
            <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#9FD6CC]">
              Excluded from site-wide sale
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
