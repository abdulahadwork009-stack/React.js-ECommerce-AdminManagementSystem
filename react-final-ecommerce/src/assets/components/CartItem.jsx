import { memo } from "react";
import Card from "./Card";
import Button from "./Button";
import { formatPrice } from "../utils/helpers";

const CartItem = memo(function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <Card className="flex flex-col items-center gap-4 sm:flex-row">
      <img src={item.thumbnail} alt={item.title} className="h-20 w-20 rounded-lg bg-gray-100 object-contain dark:bg-gray-700" />
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => onDecrease(item.id)}>−</Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button variant="secondary" onClick={() => onIncrease(item.id)}>+</Button>
      </div>
      <p className="w-24 text-center font-bold">{formatPrice(item.price * item.quantity)}</p>
      <Button variant="danger" onClick={() => onRemove(item.id)}>Remove</Button>
    </Card>
  );
});

export default CartItem;