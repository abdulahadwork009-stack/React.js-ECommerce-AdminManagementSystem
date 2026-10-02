export const initialCartState = [];

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const p = action.payload;
      const exists = state.find((item) => item.id === p.id);
      if (exists) {
        return state.map((item) =>
          item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...state,
        { id: p.id, title: p.title, price: p.price, thumbnail: p.thumbnail, quantity: 1 },
      ];
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
    case "DECREASE_QUANTITY":
      return state
        .map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}