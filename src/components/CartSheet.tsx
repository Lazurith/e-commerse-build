import React from "react";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "./ui/sheet";
import { useCart } from "../context/CartContext";
import { Separator } from "./ui/separator";

interface CartSheetProps {
  children?: React.ReactNode;
}

const CartSheet = ({ children }: CartSheetProps) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  } = useCart();
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart ({cartCount} items)
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {cartItems.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">Your cart is empty</p>
              <SheetClose asChild>
                <Button className="mt-4" variant="outline">
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 py-4">
                <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.name}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
