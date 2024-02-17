"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/formats";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { setProductQuantity } from "./action";

interface CartEntryProps {
  cartitem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartitem: { product, quantity },
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOption: JSX.Element[] = [];
  for (let index = 0; index < 99; index++) {
    quantityOption.push(
      <option key={index} value={index}>
        {index}
      </option>,
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-6">
        <Image
          src={product?.imageUrl || ""}
          alt={product?.name || ""}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={`/products/${product.id}`} className="font-bold">
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <select
            className="select select-bordered w-full max-w-[80px]"
            defaultValue={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.currentTarget.value);
              startTransition(async () => {
                await setProductQuantity(product.id, newQuantity);
              });
            }}
          >
            {quantityOption}
          </select>
          <div className="flex items-center gap-1">
            <span>Total: {formatPrice(product.price * quantity)}</span>
            <span>
              {isPending && (
                <span className="loading loading-spinner loading-xs" />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
