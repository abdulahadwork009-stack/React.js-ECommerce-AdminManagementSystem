import { memo } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";
import { formatPrice } from "../utils/helpers";

const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  return (
    <Card className="flex flex-col">
      <img src={product.thumbnail} alt={product.title} className="h-48 w-full rounded-lg bg-gray-100 object-contain dark:bg-gray-700" />
      <div className="mt-3 flex flex-1 flex-col gap-1">
        <h3 className="line-clamp-1 font-semibold">{product.title}</h3>
        <p className="text-sm capitalize text-gray-500 dark:text-gray-400">{product.category}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-indigo-600">{formatPrice(product.price)}</span>
          <span>⭐ {product.rating}</span>
        </div>
        <p className="text-sm text-green-600">{product.discountPercentage}% off</p>
      </div>
      <div className="mt-3 flex gap-2">
        <Link to={`/products/${product.id}`} className="flex-1 rounded-lg border border-indigo-600 px-3 py-2 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700">
          View Details
        </Link>
        <Button className="flex-1" onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </div>
    </Card>
  );
});

export default ProductCard;