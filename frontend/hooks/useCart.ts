"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    category: string;
  };
  quantity: number;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  // 🚀 Fixed: Secure token extraction via server cookies eliminates manual localStorage ID requirements
  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");
      const items = response.data.items || [];
      setCartItems(items);
      
      // Calculate actual total quantity count instead of plain item length mapping cells
      const count = items.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
      setTotalItems(count);
    } catch (error: any) {
      // 401 response implies session validation footprint is empty, clear active state quietly
      if (error.response?.status === 401) {
        setCartItems([]);
        setTotalItems(0);
      }
      console.error("Cart retrieval tracing failed:", error.message);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      // 🚀 Fixed: Payload sanitized to route cleanly without unverified client identifiers
      await api.post("/cart/add", { productId, quantity });
      await fetchCart();
    } catch (error) {
      console.error("Failed allocating hardware item component block:", error);
      alert("Verification failed. Please authenticate your access identity channel.");
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      await api.post("/cart/update", { productId, quantity: newQuantity });
      await fetchCart();
    } catch (error) {
      console.error("Failed adjusting system balance allocation limits:", error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await api.post("/cart/remove", { productId });
      await fetchCart();
    } catch (error) {
      console.error("Failed purging component allocation node:", error);
    }
  };

  // 🧹 Method: Flush all entries upon checkout execution
  const clearCart = async () => {
    try {
      await api.post("/cart/clear");
      await fetchCart();
    } catch (error) {
      console.error("Failed completing terminal transaction reset sequence:", error);
    }
  };

  useEffect(() => {
    fetchCart();
    window.addEventListener("focus", fetchCart);
    return () => window.removeEventListener("focus", fetchCart);
  }, []);

  return { 
    cartItems, 
    totalItems, 
    addToCart, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    refreshCart: fetchCart 
  };
}
