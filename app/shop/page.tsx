import { products } from "../../data/products";
import { getSalePrice, SALE_PERCENT } from "../../lib/pricing";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-8 pt-36 pb-28">
        <h1 className="mb-16 text-center text-5xl font-bold tracking-[0.35em]">
          SHOP
        </h1>
        <p className="-mt-10 mb-14 text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#9FD6CC]">
          {SALE_PERCENT}% off everything
        </p>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <a
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-white">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              <h2 className="mt-5 text-xl font-semibold group-hover:text-gray-300">
                {product.name}
              </h2>
              <p className="mt-2 flex items-baseline gap-3">
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="font-semibold text-[#9FD6CC]">
                  ${getSalePrice(product.price).toFixed(2)}
                </span>
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
