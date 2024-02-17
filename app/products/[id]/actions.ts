"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleCart = cart.items?.find((item) => item.productId === productId);

  {
    articleCart
      ? await prisma.cartItem.update({
          where: { id: articleCart.id },
          data: { quantity: { increment: 1 } },
        })
      : await prisma.cartItem.create({
          data: {
            cartId: cart.id!,
            productId,
            quantity: 1,
          },
        });
  }

  revalidatePath("/products/[id]");
}
