import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  redirect("/");
}

export default function page() {
  return (
    <div>
      <h1 className="font mb-3 text-lg">Let Add product</h1>
      <form action={addProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="Product Name"
          className="input input-bordered mb-3 w-full "
        />
        <textarea
          required
          placeholder="Description"
          name="description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          type="url"
          required
          name="imageUrl"
          placeholder="Image Url"
          className="input input-bordered mb-3 w-full "
        />
        <input
          type="number"
          required
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full "
        />
        <FormSubmitButton className="btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
