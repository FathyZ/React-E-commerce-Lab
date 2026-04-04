function Filter(props) {


    
    return (
    <div className="w-md m-auto py-3 mb-4 flex items-center justify-center gap-9">
      {[{id:0,name:"all"},...props.categories].map((category)=><button onClick={()=>props.filterData(category.id)} key={category.id} className="text-xl btn">{category.name}</button>)}
    </div>
  )
}

export default Filter
