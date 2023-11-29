import type { Metadata, ResolvingMetadata } from 'next'
 import Image from "next/image";
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import PriceTage from "@/components/PriceTage";
import { cache } from "react";

interface ProductPageprops {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined }
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  {
    !product && notFound();
  }
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageprops): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product?.name + "- Flowmazon",
    description: product?.description,
    openGraph: {
      images: [{ url: product?.imageUrl || "" }],
    },
  };
}

export default async function ProductId({ params: { id } }: ProductPageprops) {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
      <Image
        width={700}
        height={100}
        src={product?.imageUrl || ""}
        alt={product?.name || ""}
        className="
              max-w-[419px] 
              rounded-lg 
              shadow-xl
              "
        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{product?.name}</h1>
        <PriceTage price={product?.price || 0} className="mt-4" />
        <p className="py-6">{product?.description}</p>
      </div>
    </div>
  );
}
