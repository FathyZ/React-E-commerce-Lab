import Filter from "../components/Filter";
import Loading from "../components/Loading";

function Home(props) {
  const data = props.data;
  const itemsPerPage = 5;
  const dataLength = data.length;
  const noOfPages = Math.ceil(dataLength / itemsPerPage);
  const startIndex = props.currentPage * itemsPerPage;
  const itemsToShow = data.slice(startIndex, startIndex + itemsPerPage);
  const loading = props.isloading;

  return loading ? (
    <div className="flex items-center justify-center h-[85vh]">
      <Loading />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-between">
      <Filter filterData={props.filterData} categories={props.categories} />
      <table className="table-md m-auto">
        <thead>
          <tr>
            <th className="text-3xl">Name</th>
            <th className="text-3xl">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemsToShow.map((product) => (
            <tr key={product.id}>
              <td className="text-xl">{product.name}</td>
              <td className="text-xl">{product.price}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => props.toggleCart(product.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={product.isInCart ? "white" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="join">
      {[...Array(noOfPages)].map((_, index) => (
        <button 
          key={index} 
          onClick={() => props.setCurrentPage(index)}
          className={`join-item btn ${props.currentPage === index ? 'btn-active' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
    </div>
  );
}

export default Home;
