import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";

interface HeaderProps {
  cartItemCount?: number;
  categories?: string[];
  onSearch?: (query: string) => void;
}

const Header = ({
  cartItemCount = 0,
  categories = ["Clothing", "Electronics", "Home & Garden", "Beauty", "Sports"],
  onSearch = () => {},
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header
      className={`w-full bg-background fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-md py-2" : "py-4"}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-primary">
            ShopNow
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {categories.map((category) => (
            <DropdownMenu key={category}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base font-medium">
                  {category}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>New Arrivals</DropdownMenuItem>
                <DropdownMenuItem>Best Sellers</DropdownMenuItem>
                <DropdownMenuItem>Sale</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center space-x-3">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearchOnMobile(!showSearchOnMobile)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile Cart */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category} className="border-b pb-2">
                      <h3 className="font-medium mb-2">{category}</h3>
                      <ul className="space-y-2 pl-4">
                        <li>
                          <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            New Arrivals
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            Best Sellers
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            Sale
                          </a>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t">
                  <Button variant="outline" className="w-full mb-2">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar (Expandable) */}
      {showSearchOnMobile && (
        <div className="md:hidden px-4 py-2 bg-background border-t">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
