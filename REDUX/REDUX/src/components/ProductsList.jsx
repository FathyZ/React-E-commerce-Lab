import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../services/productsService";
import { select } from "../slices/selectedProductSlice";

function ProductsList() {
  const { data, error, isLoading } = useGetProductsQuery();

  const selectedProduct = useSelector((state) => state.selectedProduct.product);

  const dispatch = useDispatch();

  if (error) {
    return (
      <div className="w-full border-r border-slate-800 bg-slate-900 p-5 md:w-[42%] lg:w-[38%]">
        <p className="my-64 text-center text-xl font-medium text-slate-300">
          Something went wrong please refresh the page.
        </p>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center border-r border-slate-800 bg-slate-900 p-5 md:w-[42%] lg:w-[38%]">
        <p className="text-sm font-medium tracking-[0.2em] text-slate-400">
          Loading products...
        </p>
      </div>
    );
  }
  return (
    <div className="w-full border-r border-slate-800 bg-slate-900 md:w-[42%] lg:w-[38%]">
      <div className="flex flex-col gap-2 border-b border-slate-800 p-5 md:p-6">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
          Catalog
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
          Products
        </h1>
        <p className="text-sm text-slate-400">{data.length} items available</p>
      </div>
      <div className="h-[calc(100vh-180px)] overflow-y-auto md:h-[calc(100vh-190px)]">
        {data.length > 0 &&
          data.map((product) => (
            <div
              onClick={() => dispatch(select(product))}
              key={product.id}
              className={`group relative cursor-pointer border-b border-slate-800 p-4 transition-colors duration-200 ${selectedProduct && selectedProduct.id === product.id ? "bg-slate-800" : "hover:bg-slate-800/60"}`}
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-slate-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
              <h2 className="text-lg font-medium text-slate-100 md:text-xl">
                {product.name}
              </h2>
              <span className="text-sm text-slate-500">
                {product.category}
              </span>
              <span className="mt-1 inline-flex w-fit rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm font-medium text-slate-200">
                ${product.price}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductsList;