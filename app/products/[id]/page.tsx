import Image from "next/image";
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import PriceTage from "@/components/PriceTage";
interface ProductPageprops {
  params: {
    id: string;
  };
}

export default async function ProductId({ params: { id } }: ProductPageprops) {
  const product = await prisma.product.findUnique({ where: { id } });
  {
    !product && notFound();
  }
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
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
        <PriceTage price={product?.price || 0} className="mt-4"/>
        <p className="py-6">{product?.description}</p>
      </div>
    </div>
  );
}
