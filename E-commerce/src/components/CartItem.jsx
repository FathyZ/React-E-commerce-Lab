
 function CartItem(props) {

  const incrementHandler = () =>{
    props.incrementCount(props.id);
  }

  const decrementHandler = () =>{
    props.decrementCount(props.id);
  }
const removeFromCartHandler=()=>{
  props.toggleCart(props.id)
}

  return (
    <div className=" m-auto w-3/4 flex items-center justify-center bg-gray-800 rounded-lg p-5 my-5">
      <p className="mx-3  text-4xl text-amber-200">{props.name}</p>
      <span className="mx-3 text-3xl mt-2">{props.count}</span>
      <button className="btn mt-2" onClick={incrementHandler}>+</button>
      <button className="btn mt-2" onClick={decrementHandler}>-</button>
      <button className="btn btn-danger mt-2 btn-error" onClick={removeFromCartHandler} >Remove</button>
    </div>
  );
}

export default CartItem;
