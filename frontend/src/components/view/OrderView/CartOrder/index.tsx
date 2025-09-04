import { Button } from "@/components/ui/button";
import { ICartItem } from "@/types/Cart";

interface CartOrderProps {
  cart: ICartItem[];
  onIncreaseQty: (id: string) => void;
  onDecreaseQty: (id: string) => void;
}

const CartOrder = ({ cart, onIncreaseQty, onDecreaseQty }: CartOrderProps) => {
  const total = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.qty,
    0,
  );

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">Cart is empty</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item: ICartItem) => (
            <li
              key={item._id}
              className="flex items-center justify-between gap-2"
            >
              <span className="font-medium">{item.name}</span>

              {/* Control qty */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDecreaseQty(item._id)}
                  className="h-7 w-7 rounded-full bg-gray-200 text-lg font-bold text-gray-600 hover:cursor-pointer hover:bg-gray-300"
                >
                  –
                </button>
                <span className="w-6 text-center font-semibold">
                  {item.qty}
                </span>
                <button
                  onClick={() => onIncreaseQty(item._id)}
                  className="bg-highlight hover:bg-highlight/80 h-7 w-7 rounded-full text-lg font-bold text-white hover:cursor-pointer"
                >
                  +
                </button>
              </div>

              <span className="text-sm font-semibold">
                Rp {(item.price * item.qty).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t pt-2 font-semibold">
        Total: Rp {total.toLocaleString()}
        <Button
          size="lg"
          className="bg-highlight hover:bg-highlight/90 text-white hover:cursor-pointer"
          disabled={cart.length === 0}
          onClick={() => console.log(cart)}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartOrder;
