import { reactive, computed } from 'vue';

export const cartState = reactive({
  items: [],
  isOpen: false
});

export const cartGetters = {
  totalItems: computed(() => cartState.items.reduce((total, item) => total + item.quantity, 0)),
  totalPrice: computed(() => cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0))
};

export const cartActions = {
  addItem(product, size, quantity) {
    const existingItem = cartState.items.find(
      item => item.id === product.id && item.size === size
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartState.items.push({
        ...product,
        size,
        quantity,
        cartItemId: Date.now() + Math.random().toString(36).substr(2, 9)
      });
    }
    cartState.isOpen = true; // Automatically open cart drawer
  },
  removeItem(cartItemId) {
    cartState.items = cartState.items.filter(item => item.cartItemId !== cartItemId);
  },
  updateQuantity(cartItemId, quantity) {
    const item = cartState.items.find(item => item.cartItemId === cartItemId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
  },
  toggleCart() {
    cartState.isOpen = !cartState.isOpen;
  },
  openCart() {
    cartState.isOpen = true;
  },
  closeCart() {
    cartState.isOpen = false;
  },
  clearCart() {
    cartState.items = [];
  }
};
