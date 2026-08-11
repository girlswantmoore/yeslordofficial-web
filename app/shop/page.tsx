import { products } from "../../data/products";
import FeaturedProducts from "../../components/FeaturedProducts";

export default function ShopPage() {
  const featuredProducts = products.filter(
    (product) => "featured" in product && product.featured,
  );
  const standardProducts = products.filter(
    (product) => !("featured" in product && product.featured),
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-8 pt-36 pb-28">
        <h1 className="mb-16 text-center text-5xl font-bold tracking-[0.35em]">
          SHOP
        </h1>

        <FeaturedProducts products={featuredProducts} />

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-10 md:gap-x-10 lg:grid-cols-3">
          {standardProducts.map((product) => {
            const isSoldOut = product.colors.every(
              (color) => "soldOut" in color && color.soldOut,
            );

            return (
            <a
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white">
                {isSoldOut && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-black px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white">
                    Sold out
                  </span>
                )}
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              <h2 className="mt-3 text-sm font-semibold group-hover:text-gray-300 sm:mt-5 sm:text-xl">
                {product.name}
              </h2>
              <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>
            </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
