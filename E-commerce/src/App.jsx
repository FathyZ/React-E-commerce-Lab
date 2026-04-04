import Cart2 from "./components/Cart2";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import axios from "axios";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import EditMenu from "./pages/EditMenu";
import Product from "./pages/Product";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const categories = [
    { id: 1, name: "burger" },
    { id: 2, name: "fries" },
    { id: 3, name: "drink" },
    { id: 4, name: "dessert" },
    { id: 5, name: "nuggets" },
    { id: 6, name: "sides" },
  ];
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/items");
        console.log(res);
        setData(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const incrementCount = (itemId) => {
    const newData = data.map((product) => {
      if (product.id === itemId) {
        product = { ...product };
        product.count++;
        return product;
      }
      return product;
    });
    setData(newData);
  };
  const decrementCount = (itemId) => {
    const newData = data.map((product) => {
      if (product.id === itemId) {
        product = { ...product };
        product.count === 0 ? product.count : product.count--;
        return product;
      }
      return product;
    });
    setData(newData);
  };

  const toggleCart = (itemId) => {
    const newData = data.map((product) => {
      if (product.id === itemId) {
        product = { ...product };
        product.isInCart = !product.isInCart;
        product.count = product.isInCart ? 1 : 0;
        return product;
      }
      return product;
    });
    setData(newData);
  };
  const clearall = () => {
    console.log(data);
    const newdata = data.map((product) => ({
      ...product,
      isInCart: product.isInCart ? !product.isInCart : product.isInCart,
    }));
    setData(newdata);
    console.log(newdata);
  };
  const filterData = (selectedCategoryId) => {
    setSelectedCategoryId(selectedCategoryId);
    setCurrentPage(0);
  };

  const handleAddProduct = async (product) => {
    const res = await axios.post("http://localhost:3000/items", product);
    setData((prevData) => [...prevData, res.data]);
    return res.data;
  };

  const handleEditProduct = async (id, updatedProduct) => {
    const res = await axios.put(
      `http://localhost:3000/items/${id}`,
      updatedProduct,
    );
    setData((prevData) =>
      prevData.map((product) => (product.id === id ? res.data : product)),
    );
    return res.data;
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/items/${id}`);
    setData((prevData) => prevData.filter((product) => product.id !== id));
  };


  return (
    <>
      <Navbar />
      <div className="h-16"></div>
      <Routes>
        <Route
          index
          element={
            <Home
              categories={categories}
              isloading={loading}
              data={data.filter(
                (product) =>
                  product.categoryId === selectedCategoryId ||
                  selectedCategoryId === 0,
              )}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              toggleCart={toggleCart}
              filterData={filterData}
            />
          }
        />
        <Route path="/about" element={<h1>ABOUT</h1>} />
        <Route
          path="/cart"
          element={
            <Cart2
              data={data.filter((product) => product.isInCart === true)}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
              toggleCart={toggleCart}
              clearall={clearall}
            />
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
          <Route
            path="/edit-menu"
            element={
              

            <EditMenu data={data} onDelete={handleDeleteProduct} />
            }
          />
          <Route
            path="/product"
            element={
              <Product
                data={data}
                categories={categories}
                mode="add"
                onAddProduct={handleAddProduct}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <Product
                data={data}
                categories={categories}
                mode="edit"
                onEditProduct={handleEditProduct}
              />
            }
          />
      </Routes>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
