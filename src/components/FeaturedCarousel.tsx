import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  discount?: number;
  isNew?: boolean;
}

interface FeaturedCarouselProps {
  products?: Product[];
}

const FeaturedCarousel = ({ products = [] }: FeaturedCarouselProps) => {
  // Default products if none are provided
  const defaultProducts: Product[] = [
    {
      id: "1",
      title: "Premium Wireless Headphones",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      discount: 15,
      isNew: true,
    },
    {
      id: "2",
      title: "Smart Watch Series 7",
      price: 349.99,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    },
    {
      id: "3",
      title: "Ultra HD 4K Camera",
      price: 599.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
      isNew: true,
    },
    {
      id: "4",
      title: "Portable Bluetooth Speaker",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      discount: 20,
    },
    {
      id: "5",
      title: "Ergonomic Gaming Chair",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=800&q=80",
    },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full bg-background py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev > 0 ? prev - 1 : displayProducts.length - 1,
                )
              }
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev < displayProducts.length - 1 ? prev + 1 : 0,
                )
              }
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile and Desktop Carousel */}
        <Carousel className="w-full">
          <CarouselContent>
            {displayProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border-0 shadow-md overflow-hidden h-[400px] md:h-[450px]">
                  <div className="relative h-[250px] md:h-[300px] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                          New
                        </Badge>
                      )}
                      {product.discount && (
                        <Badge className="bg-red-500 hover:bg-red-600">
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>
                    <Button className="absolute bottom-3 right-3 bg-white text-black hover:bg-gray-100">
                      Quick View
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        {product.discount ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">
                              $
                              {(
                                product.price *
                                (1 - product.discount / 100)
                              ).toFixed(2)}
                            </span>
                            <span className="text-gray-500 line-through text-sm">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-lg">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </div>
        </Carousel>

        {/* Mobile Indicators */}
        <div className="flex justify-center mt-6 md:hidden">
          {displayProducts.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 p-0 rounded-full mx-1 ${currentSlide === index ? "bg-primary" : "bg-gray-300"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
