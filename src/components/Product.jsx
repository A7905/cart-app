
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-hot-toast";
import { add,remove } from '../redux/slices/CartSlice';


const Product = ({post}) => {


    const {cart}=useSelector((state)=> state);
    const dispatch=useDispatch();

    const addToCart=()=>{
        dispatch(add(post));
        toast.success("Item Added to Cart");

    }

    const removeFromCart=()=>{
        dispatch(remove(post.id));
        toast.error("Item Removed from Cart")
    }


  return (
    <div className=' flex flex-col justify-between items-center transition-all  duration-300 ease-in hover:shadow-2xl hover:shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] hover:scale-110 gap-3
    p-4 mt-10 ml-5 rounded-xl outline'>
      <div className=' '>
        <p className='text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1 '>{post.title.split(" ").slice(0,2.5).join(" ")+"..."}</p>
      </div>
      <div>
        <p className='w-40 text-gray-400 font-normal text-[10px] text-left  '>{post.description.split(" ").slice(0,10).join(" ")+"..."}</p>
      </div>
      <div className='h-[140px]'>
        <img className='h-full w-full' src={post.image} alt="" />
      </div>
      <div className='flex justify-between items-center w-full mt-5'>
        <p className='text-green-600 font-semibold'>${post.price}</p>
        <button className='cursor-pointer text-gray-700 rounded-full font-semibold p-1 px-3 
         transition-all  duration-300 ease-in uppercase border-2 border-gray-700 text-[12px] hover:bg-gray-700 hover:text-white'>
          {
              cart.some((p)=> p.id==post.id) ? 
              (<button onClick={removeFromCart}>Remove Item</button>):
              (<button onClick={addToCart}>Add to Cart</button>)
          }
        </button>
      </div>
      
    </div>
  )
}

export default Product
