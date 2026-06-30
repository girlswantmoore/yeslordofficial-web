import { products } from "../../data/products";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-8 pt-36 pb-28">
        <h1 className="mb-16 text-center text-5xl font-bold tracking-[0.35em]">
          SHOP
        </h1>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <a
              key={product.slug}
              href={`/shop/${product.slug}`}
              className={`group ${
                index === products.length - 1 ? "lg:col-start-2" : ""
              }`}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-zinc-900">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-gray-500">
                {product.category}
              </p>

              <h2 className="mt-2 text-xl font-semibold group-hover:text-gray-300">
                {product.name}
              </h2>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}