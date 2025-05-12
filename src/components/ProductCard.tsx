import React from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "Premium Wireless Headphones",
  price = 129.99,
  originalPrice = 159.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  rating = 4.5,
  isNew = false,
  isSale = true,
  onAddToCart = () => {},
  onViewDetails = () => {},
}: ProductCardProps) => {
  // Generate rating stars
  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(id);
  };

  return (
    <Card
      className="h-full w-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-white"
      onClick={() => onViewDetails(id)}
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
          {isSale && (
            <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-lg line-clamp-2 mb-1">{name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">{renderRatingStars()}</div>
          <span className="text-sm text-gray-500">{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-gray-500 text-sm line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" variant="outline">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
