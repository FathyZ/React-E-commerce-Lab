import CartItem from "./CartItem";

function Cart2(props) {



  return (
    <>
    {props.data.length === 0 ? <h1 className="text-4xl font-bold w-fit m-auto my-30">Order Now !!!</h1>:       props.data.map(product => 
        <CartItem name={product.name} id={product.id} count={product.count} incrementCount={props.incrementCount} decrementCount={props.decrementCount} toggleCart={props.toggleCart} key={product.id} />
    )
  }
  <button className="btn btn-error ml-60" onClick={props.clearall}>Clear Cart</button>

    </>
  );
}

export default Cart2;
