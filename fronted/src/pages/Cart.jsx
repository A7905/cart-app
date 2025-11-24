import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () => {
    const {cart}=useSelector((state)=> state);
    const[totalAmount,setTotalAmount]=useState(0);

    useEffect(()=>{
        setTotalAmount(cart.reduce((acc,curr)=> acc+curr.price,0));
    },[cart])
  return (
    <div className='w-full h-screen'>
      {
        cart.length >0 ? 
        (
            <div className='flex mt-30 items-center justify-evenly'>
                <div className='grid p-2 mx-auto space-y-5 min-h-[80vh] max-w-[1000vw]'>
                    {
                        cart.map((item,index)=>(
                            <div key={item.id}>
                                <CartItem item={item} itemIndex={index}/>
                                <hr/>
                            </div>
                            
                        ))
                    }
                </div>

                <div className="flex flex-col h-[70vh] space-x-0 p-4 justify-between border-2 mr-20 ">
                    <div className=''>
                        <div className='text-gray-700 text-2xl underline'>Your Cart</div>
                        <div className='text-4xl text-green-700'>Summary</div>

                        <div className='flex '>  
                                <p className='text-2xl'>
                                    Total items: 
                                 </p>
                                 <span className='p-1 text-xl'>{cart.length}</span>
                        </div>
                    </div>

                    {/* <div className=''>
                        <p className='font-semibold text-xl text-gray-500'>Total Amount: ${totalAmount.toFixed(2)}</p>
                        <button className='p-3 w-full bg-green-600 rounded-md cursor-pointer mt-5'>
                            Checkout Now
                        </button>
                    </div> */}
                    <Checkout key="cart.id" totalAmount={totalAmount.toFixed(2)}/>


                </div>

                
                
            </div>
        ) :
            (
                <div className='w-full h-full gap-3 flex flex-col  justify-center items-center'>
                    <h1 className='text-gray-700'>Your Cart is Empty!</h1>
                    <Link to={"/"}>
                        <button className='cursor-pointer border-2 border-gray-700 bg-green-400 p-3 rounded-md text-white '>Shop Now!</button>
                    </Link>
                    
                </div>
            
            )
      }
    </div>
  )
}

export default Cart
