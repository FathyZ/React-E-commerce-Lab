import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import z from "zod";

const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  categoryId: z.coerce
    .number()
    .int("Category must be an integer")
    .positive("Category must be greater than 0"),
});

function Product(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = props.data ?? [];
  const categories = props.categories ?? [];
  const mode = props.mode;
  const onAddProduct = props.onAddProduct;
  const onEditProduct = props.onEditProduct;
  const selectedProduct =
    mode === "edit"
      ? data.find((item) => String(item.id) === String(id))
      : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: selectedProduct?.name ?? "",
      price: selectedProduct?.price ?? "",
      categoryId: selectedProduct?.categoryId ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: selectedProduct?.name ?? "",
      price: selectedProduct?.price ?? "",
      categoryId: selectedProduct?.categoryId ?? "",
    });
  }, [selectedProduct, reset]);

  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      price: values.price,
      categoryId: values.categoryId,
      count: 0,
      isInCart: false,
    };

    try {
      if (mode === "add") {
        await onAddProduct(payload);
        toast.success("Product added successfully");
      } else {
        const existing = selectedProduct;
        if (!existing) {
          toast.error("Product not found");
          return;
        }
        await onEditProduct(id, {
          ...existing,
          ...payload,
        });
        toast.success("Product updated successfully");
      }
      navigate("/edit-menu");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        {mode === "add" ? "Add Product" : "Edit Product"}
      </h1>
      <form className="space-y-4 w-3/4 mx-auto">
        <div>
          <input
            {...register("name")}
            placeholder="Name"
            className="input w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            {...register("price")}
            placeholder="Price"
            className="input w-full"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div>
          <select {...register("categoryId")} className="input w-full">
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit((data) => onSubmit(data))}
        >
          {mode === "add" ? "Add" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Product;
