import { Link } from "react-router";
import { toast } from "react-toastify";
function EditMenu(props) {

    const data = props.data || [];
    const onDelete = props.onDelete;

    console.log(data);

    const handleDelete = async (id) => {
        try {
            await onDelete(id);
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Failed to delete product");
            console.log(error);
        }
    }
    
  return (
    <div className="container mx-auto p-4 relative" >
        <Link to="/product" className="fixed bottom-8 right-10 h-14 cursor-pointer aspect-square bg-black text-white rounded-full flex items-center justify-center text-2xl">+</Link>

        <h1 className="text-3xl font-bold text-center">Edit Menu</h1>
        <table className="table mx-auto text-center">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.categoryId}</td>
                        <td>
                            <Link to={`/product/${product.id}`}>
                                <button className="btn btn-primary">Edit</button>
                            </Link>
                            <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default EditMenu
