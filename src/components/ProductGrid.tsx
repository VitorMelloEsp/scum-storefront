import { useState } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Available <span className="text-primary">Items</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-md border px-3 py-1.5 text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
