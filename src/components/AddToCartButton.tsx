import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface AddToCartButtonProps extends ButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  showIcon?: boolean;
}

const AddToCartButton = ({
  product,
  showIcon = true,
  children,
  className,
  ...props
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Button onClick={handleAddToCart} className={className} {...props}>
      {showIcon && <ShoppingCart className="mr-2 h-4 w-4" />}
      {children || "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
