import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";

import ProductsCard from "@/components/ProductsCard";
import prisma from "@/lib/db/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            width={700}
            height={100}
            src={products[0].imageUrl}
            alt={products[0].name}
            className="
              max-w-[419px] 
              rounded-lg 
              shadow-xl
              "
              priority
          />
          <div>
            <h1 className="text-5xl font-bold">{products[0].name}!</h1>
            <p className="py-6">
              {products[0].description}
            </p>
            <Link 
              href={`/products/${products[0].id}`}
              className="btn btn-primary">Chexk It Out</Link>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        {
          products.slice(1).map((product) => (
            <ProductsCard product={product} key={product.id} />
          ))
        }
      </div>
    </main>
  );
}
