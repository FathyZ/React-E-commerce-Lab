import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 md:min-h-[calc(100vh-3rem)]">
        <ProductsList />
        <ProductDetails />
      </div>
    </div>
  );
}

export default App;