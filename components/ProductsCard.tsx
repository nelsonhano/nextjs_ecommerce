import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PriceTage from "./PriceTage";

interface ProductsCardProps {
  product: Product;
}

export default function ProductsCard({ product }: ProductsCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      href={`/products/${product.id}`}
      className="card shadow-lg transition hover:shadow-2xl"
    >
      <div className="h-66 w-49 card h-96 bg-black p-1 pt-3">
        <figure>
          <Image
            src={product.imageUrl}
            width={200}
            height={1}
            alt={product.name}
            className="object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.name}!
            {isNew ? <div className="badge badge-secondary">NEW</div> : <></>}
          </h2>
          {/* <p>{product.description}</p> */}
          <div className="card-actions justify-end">
            <div className="badge badge-outline">
              <PriceTage price={product.price} />
            </div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
