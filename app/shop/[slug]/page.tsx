"use client";

import { use, useState } from "react";
import { products } from "../../../data/products";
import { useCart } from "../../../components/CartContext";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((item) => item.slug === slug);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="pt-40 text-center text-3xl">Product not found.</div>
      </main>
    );
  }

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [view, setView] = useState<"front" | "back">("front");

  const selectedColor = product.colors[selectedColorIndex];

  const hasBack = "back" in selectedColor && selectedColor.back;
  const isSoldOut = "soldOut" in selectedColor && selectedColor.soldOut;

const soldOutSizes: string[] =
  "soldOutSizes" in selectedColor
    ? (selectedColor.soldOutSizes as string[])
    : [];
  const isSelectedSizeSoldOut = soldOutSizes.includes(selectedSize);

  const image =
    view === "back" && hasBack ? selectedColor.back : selectedColor.front;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto grid max-w-7xl gap-16 px-8 py-32 lg:grid-cols-2">
        <div>
          <div className="flex h-[750px] items-center justify-center bg-[#111] p-8">
            <img
              src={image}
              alt={`${product.name} ${selectedColor.name} ${view}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {hasBack && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => setView("front")}
                className={`border p-3 transition ${
                  view === "front" ? "border-white" : "border-gray-700"
                }`}
              >
                <img
                  src={selectedColor.front}
                  alt="Front"
                  className="mx-auto h-32 object-contain"
                />
                <p className="mt-3 text-xs uppercase tracking-[0.25em]">
                  Front
                </p>
              </button>

              <button
                onClick={() => setView("back")}
                className={`border p-3 transition ${
                  view === "back" ? "border-white" : "border-gray-700"
                }`}
              >
                <img
                  src={selectedColor.back}
                  alt="Back"
                  className="mx-auto h-32 object-contain"
                />
                <p className="mt-3 text-xs uppercase tracking-[0.25em]">
                  Back
                </p>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <a
            href="/shop"
            className="mb-8 text-sm uppercase tracking-[0.25em] text-gray-500 hover:text-white"
          >
            ← Back to Shop
          </a>

          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
          
          </p>

          <h1 className="mb-6 text-5xl font-bold">{product.name}</h1>

          <p className="mb-10 text-3xl">${product.price.toFixed(2)}</p>

          <h2 className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-400">
            Color: {selectedColor.name}
          </h2>

          <div className="mb-10 flex flex-wrap gap-4">
            {product.colors.map((color, index) => (
              <button
                key={color.name}
                onClick={() => {
                  setSelectedColorIndex(index);
                  setSelectedSize(product.sizes[0]);
                  setView("front");
                }}
                title={color.name}
                className={`h-12 w-12 overflow-hidden rounded-full border transition ${
                  selectedColorIndex === index
                    ? "scale-110 border-white ring-2 ring-white ring-offset-2 ring-offset-black"
                    : "border-gray-700 hover:border-white"
                }`}
              >
                <div className="flex h-full w-full">
                  {color.swatch.map((swatchColor) => (
                    <div
                      key={swatchColor}
                      className="h-full flex-1"
                      style={{ backgroundColor: swatchColor }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>

          <h2 className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-400">
            Size: {selectedSize}
          </h2>

          <div className="mb-10 flex flex-wrap gap-4">
            {product.sizes.map((size) => {
              const isThisSizeSoldOut = soldOutSizes.includes(size);

              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={isSoldOut || isThisSizeSoldOut}
                  className={`border px-5 py-3 transition ${
                    isSoldOut || isThisSizeSoldOut
                      ? "cursor-not-allowed border-gray-800 text-gray-700 line-through"
                      : selectedSize === size
                      ? "border-white bg-white text-black"
                      : "border-gray-600 hover:border-white"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <button
            disabled={isSoldOut || isSelectedSizeSoldOut}
            onClick={() => {
              if (isSoldOut || isSelectedSizeSoldOut) return;

              addToCart({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image,
                color: selectedColor.name,
                size: selectedSize,
                quantity: 1,
              });

              alert("Added to cart!");
            }}
            className={`py-4 uppercase tracking-[0.3em] transition ${
              isSoldOut || isSelectedSizeSoldOut
                ? "cursor-not-allowed bg-gray-800 text-gray-500"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {isSoldOut || isSelectedSizeSoldOut ? "Sold Out" : "Add To Cart"}
          </button>

          <p className="mt-10 leading-8 text-gray-400">
            {product.description}
          </p>
        </div>
      </section>
    </main>
  );
}