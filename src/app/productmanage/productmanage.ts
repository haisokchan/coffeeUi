import { Component } from '@angular/core';
// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  favorite: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface Discount {
  id: number;
  name: string;
  discount: number;
  icon: string;
}
@Component({
  selector: 'app-productmanage',
  imports: [CommonModule, FormsModule],
  templateUrl: './productmanage.html',
  styleUrl: './productmanage.css',
})
export class Productmanage {
// ============================================
// app.component.ts
// ============================================

  products: Product[] = [
    { id: 1, name: 'Cappuccino', category: 'DRINKS', price: 4.50, image: '☕', favorite: true },
    { id: 2, name: 'Chicken wrap', category: 'SANDWICHES AND WRAPS', price: 8.99, image: '🌯', favorite: true },
    { id: 3, name: 'Chocolate Chip Muffins', category: 'DESSERTS', price: 3.21, image: '🧁', favorite: true },
    { id: 4, name: 'Dark Chocolate', category: 'DESSERTS', price: 5.50, image: '🍫', favorite: true },
    { id: 5, name: 'Donuts', category: 'DESSERTS', price: 2.99, image: '🍩', favorite: true },
    { id: 6, name: 'Jalapeno Cheddar', category: 'SANDWICHES AND WRAPS', price: 9.50, image: '🧀', favorite: false },
    { id: 7, name: 'Latte', category: 'DRINKS', price: 4.75, image: '☕', favorite: true },
    { id: 8, name: 'Macarons', category: 'DESSERTS', price: 6.00, image: '🍪', favorite: true },
    { id: 9, name: 'Muffin', category: 'DESSERTS', price: 3.50, image: '🧁', favorite: true },
    { id: 10, name: 'Strawberry smoothie', category: 'SMOOTHIES', price: 5.99, image: '🥤', favorite: false },
    { id: 11, name: 'Pancakes with berries', category: 'DESSERTS', price: 7.99, image: '🥞', favorite: false },
    { id: 12, name: 'Red Velvet Cake', category: 'DESSERTS', price: 6.50, image: '🍰', favorite: false },
    { id: 13, name: 'Philadelphia Cheesecake', category: 'DESSERTS', price: 7.25, image: '🍰', favorite: false },
    { id: 14, name: 'French Croissant', category: 'DESSERTS', price: 3.75, image: '🥐', favorite: true },
    { id: 15, name: 'Burger', category: 'SANDWICHES AND WRAPS', price: 10.99, image: '🍔', favorite: false },
    { id: 16, name: 'Orange Juice', category: 'DRINKS', price: 3.99, image: '🧃', favorite: true },
    { id: 17, name: 'Green tea matcha latte', category: 'DRINKS', price: 4.30, image: '🍵', favorite: false },
    { id: 18, name: 'Ice cream / Strawberry', category: 'DESSERTS', price: 4.00, image: '🍨', favorite: false },
    { id: 19, name: 'Fruit smoothie', category: 'SMOOTHIES', price: 5.99, image: '🥤', favorite: false },
    { id: 20, name: 'Salads', category: 'SALADS', price: 8.50, image: '🥗', favorite: false },
  ];

  categories: string[] = ['ALL', 'DRINKS', 'DESSERTS', 'SNACKS', 'SANDWICHES AND WRAPS', 'SALADS', 'SMOOTHIES'];

  discounts: Discount[] = [
    { id: 1, name: 'Big sale', discount: 0.15, icon: '🏷️' },
    { id: 2, name: 'Happy hour', discount: 0.20, icon: '🏷️' }
  ];

  cart: CartItem[] = [
    { id: 17, name: 'Green tea matcha latte', price: 4.30, quantity: 2, variant: 'Vanilla' },
    { id: 3, name: 'Chocolate chip muffin', price: 3.21, quantity: 2, variant: '' },
    { id: 18, name: 'Ice cream / Strawberry', price: 4.00, quantity: 3, variant: 'Sprinkles' },
    { id: 19, name: 'Fruit smoothie', price: 5.99, quantity: 3, variant: '' },
  ];

  selectedCategory: string = 'ALL';
  searchTerm: string = '';
  orderType: string = 'Take out';
  selectedDiscount: number | null = null;
  showFavoritesOnly: boolean = false;

  getFilteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'ALL' || product.category === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFavorites = !this.showFavoritesOnly || product.favorite;
      return matchesCategory && matchesSearch && matchesFavorites;
    });
  }

  addToCart(product: Product): void {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1 
      });
    }
  }

  updateQuantity(id: number, delta: number): void {
    const item = this.cart.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.cart = this.cart.filter(i => i.id !== id);
      }
    }
  }

  toggleDiscount(id: number): void {
    this.selectedDiscount = this.selectedDiscount === id ? null : id;
  }

  toggleFavorites(): void {
    this.showFavoritesOnly = !this.showFavoritesOnly;
  }

  getSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getDiscountAmount(): number {
    if (!this.selectedDiscount) return 0;
    const discount = this.discounts.find(d => d.id === this.selectedDiscount);
    return discount ? this.getSubtotal() * discount.discount : 0;
  }

  getTax(): number {
    return (this.getSubtotal() - this.getDiscountAmount()) * 0.08;
  }

  getTotal(): number {
    return this.getSubtotal() - this.getDiscountAmount() + this.getTax();
  }
}
