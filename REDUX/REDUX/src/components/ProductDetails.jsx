import { useSelector } from "react-redux";

function ProductDetails() {
  const selectedProduct = useSelector((state) => state.selectedProduct.product);

  return (
    <div className="flex w-full items-center justify-center bg-slate-950 p-5 md:w-[58%] lg:w-[62%] md:p-8">
      {selectedProduct ? (
        <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-10">
          <span className="inline-flex rounded-full border border-slate-700 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
            {selectedProduct.category}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 md:text-5xl">
            {selectedProduct.name}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400 md:text-base">
            Minimal product details shown in a dark, quiet layout.
          </p>
          <div className="mt-8 flex items-end gap-3">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Price
            </span>
            <span className="text-4xl font-semibold text-slate-100 md:text-5xl">
              ${selectedProduct.price}
            </span>
          </div>
        </div>
      ) : (
        <div className="max-w-xl rounded-2xl border border-dashed border-slate-800 bg-slate-900 p-10 text-center">
          <p className="text-2xl font-medium text-slate-100 md:text-3xl">
            Please select a product to show its details.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Choose an item from the left panel to reveal its spotlight view.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;