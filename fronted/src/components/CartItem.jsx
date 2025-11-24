import React from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { remove } from '../redux/slices/CartSlice';
import {toast} from 'react-hot-toast';
const CartItem = ({item}) => {
    
    const dispatch=useDispatch();
    const removeFromCart=()=>{
        dispatch(remove(item.id));
        toast.success("Item Removed!")
    }
  return (
    <div className='max-w-[900vw]'>
      <div className='flex gap-5'>
        <div className='h-[20vh]'>
            <img className='h-full' src={item.image} alt="" />
        </div>
        <div className='mt-5 w-full'>
            <h1 className='text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1 '>{item.title.split(" ").slice(0,2.5).join(" ")+"..."}</h1>
            <h1 className='mt-5 w-40 text-gray-400 font-normal text-[12px] text-left  '>{item.description.split(" ").slice(0,10).join(" ")+"..."}</h1>
            <div className='flex w-full justify-between'>
                <p className='mt-10 text-green-600 font-semibold'>${item.price}</p>
                <div className='mt-10 cursor-pointer p-2 rounded-full bg-green-400 animate-bounce' onClick={removeFromCart}><MdDelete/></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
