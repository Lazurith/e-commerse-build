import React, { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

interface ProductGridProps {
  products?: Product[];
  categories?: string[];
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      title: "Wireless Headphones",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      rating: 4.5,
      category: "Electronics",
    },
    {
      id: "2",
      title: "Premium Watch",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      rating: 4.8,
      category: "Accessories",
    },
    {
      id: "3",
      title: "Leather Backpack",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&q=80",
      rating: 4.2,
      category: "Bags",
    },
    {
      id: "4",
      title: "Running Shoes",
      price: 119.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      rating: 4.7,
      category: "Footwear",
    },
    {
      id: "5",
      title: "Smart Speaker",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?w=500&q=80",
      rating: 4.3,
      category: "Electronics",
    },
    {
      id: "6",
      title: "Sunglasses",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
      rating: 4.1,
      category: "Accessories",
    },
    {
      id: "7",
      title: "Denim Jacket",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
      rating: 4.6,
      category: "Clothing",
    },
    {
      id: "8",
      title: "Coffee Maker",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1570286424717-86d8a0082d60?w=500&q=80",
      rating: 4.9,
      category: "Home",
    },
  ],
  categories = [
    "All",
    "Electronics",
    "Accessories",
    "Bags",
    "Footwear",
    "Clothing",
    "Home",
  ],
}: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Products</h2>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
