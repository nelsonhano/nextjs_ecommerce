import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./action";

export const metadata = {
  title: "Your Carts - Flowmazon",
};

export default async function Carts() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map(cartitem => (
        <CartEntry setProductQuantity={setProductQuantity} cartitem={cartitem} key={cartitem.id} />
      ))}
    </div>
  );
}
