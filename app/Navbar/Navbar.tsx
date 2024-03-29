import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.png"
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";



async function searchProducts(formData: FormData) {
    "use server"

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
        redirect("search?query" + searchQuery)
    }
}

export default async function Navbar() {
    const cart = await getCart();
    return  (
        <div className="bg-base-100">
            <div className="navbar min-w-fit m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl normal-case">
                        <Image src={logo} height={40} width={40} alt="Flawazon logo" />
                        Flomazon
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input 
                                type="text"
                                name="searchQuery"
                                placeholder="search"
                                className="input input-bordered w-full min-w-[100px]"
                                />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                </div>
            </div>
         </div>
    )
}