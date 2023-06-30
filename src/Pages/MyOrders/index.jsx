import { Layout } from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context";
import { Cart } from "../../Components/Cart";
import { ProductDetail } from "../../Components/Productdetail";
import { CheckOutView } from "../../Components/CheckOutView";
import { useContext } from "react";
import React from "react"
import { NavLink } from "react-router-dom";


function MyOrders(){
    const context = useContext(ShoppingCartContext)
    return(
        <Layout>
            <section className='flex w-9/12 h-auto flex-wrap justify-around'>

                {context.finalList.length > 0 ? context.finalList.map((element, index)=>{
                    
                    if(element.length == 2){
                        console.log('hey')
                        return(
                            <React.Fragment key = {(index + 3124242) * 83824824}>
                            <div key = {(index + 4)  * 8757} className='bg-slate-300 w-[80%] flex flex-row flex-wrap justify-center rounded-t-lg'>
                                

                                {element.map((product, index)=>{
                                    if(typeof product == 'number'){
                                        return(
                                            ''
                                        )
                                    }else{
                                        return(
                                            <div key = {(index + 21) * 22131} className='basis-[30%] h-[300px] bg-red-400 ml-4 mr-3 rounded-lg mt-2 grow-0 shrink-0'>
                                                <figure key={(index + 883) * 7828} className='w-full h-[75%]'>
                                                    <img key = {(index + 83832) * 32}src={product?.mainProduct?.productImg} className='w-full h-full object-cover rounded-lg'/>
                                                </figure>
                                                <p key = {(index + 323) * 32424}className='text-center'>{product?.mainProduct?.productName.length > 29 ? `${product?.mainProduct?.productName.substring(0, 28)}...` : product?.mainProduct?.productName}</p>
                                                <p key = {(index + 788) * 8382}className='text-center'>You've ordered <span key = {(index + 88221) * 673276376}className='font-semibold'>{product?.amount}</span> of this product</p>
                                                <p key = {(index + 8989) * 783283}className='text-center'>for <span key = {(index + 321) * 3244324} className='font-semibold'>{product?.mainProduct?.productPrice}</span>$ each</p>
                                            </div>
                                            
                                        )
                                    }

                                    
                                })}

                                
                            </div>

                            <div key = {(index + 45) * 4324} className='bg-slate-300 w-[80%] flex flex-row flex-wrap !rounded-b-lg mb-5 justify-center'>
                                {element.map((product, index)=>{
                                    if(typeof product == 'number'){
                                        return(
                                            <React.Fragment key = {(index + 3221) * 3777}>
                                                <span key = {(index + 737) * 213} className='mt-2 mb-2'>Total comes at {product}$</span>
                                                
                                            </React.Fragment>
                                            
                                        )
                                    }
                                })}

                                    <div key = {(index + 53255) * 84} className='w-full flex flex-row justify-center mb-2'>
                                        <button key={(index + 36216) * 999} className='w-1/3 h-10 rounded-lg bg-red-400 text-white transition-all duration-300 hover:bg-red-500' onClick={()=>{
                                            const newElement = index
                                            context.cancelingOrder(newElement)
                                        }}>Cancel</button>
                                    </div>
                            </div>

                        </React.Fragment>
                        )
                    }else if(element.length == 3){
                        
                        return( 
                            <React.Fragment key = {(index + 3124242) * 83824824}>
                                <div key = {(index + 4)  * 8757} className='bg-slate-300 w-[80%] flex flex-row flex-wrap justify-around rounded-t-lg'>
                                    
    
                                    {element.map((product, index)=>{
                                        if(typeof product == 'number'){
                                            return(
                                                ''
                                            )
                                        }else{
                                            return(
                                                <div key = {(index + 21) * 22131} className='basis-[30%] h-[300px] bg-red-400 rounded-lg mt-2 grow-0 shrink-0'>
                                                    <figure key={(index + 883) * 7828} className='w-full h-[75%]'>
                                                        <img key = {(index + 83832) * 32}src={product?.mainProduct?.productImg} className='w-full h-full object-cover rounded-lg'/>
                                                    </figure>
                                                    <p key = {(index + 323) * 32424}className='text-center'>{product?.mainProduct?.productName.length > 29 ? `${product?.mainProduct?.productName.substring(0, 28)}...` : product?.mainProduct?.productName}</p>
                                                    <p key = {(index + 788) * 8382}className='text-center'>You've ordered <span key = {(index + 88221) * 673276376}className='font-semibold'>{product?.mainProduct.productAmount}</span> of this product</p>
                                                    <p key = {(index + 8989) * 783283}className='text-center'>for <span key = {(index + 321) * 3244324} className='font-semibold'>{product?.mainProduct?.productPrice}</span>$ each</p>
                                                </div>
                                                
                                            )
                                        }
    
                                        
                                    })}
    
                                    
                                </div>
    
                                <div key = {(index + 45) * 4324} className='bg-slate-300 w-[80%] flex flex-row flex-wrap !rounded-b-lg mb-5 justify-center'>
                                    {element.map((product, index)=>{
                                        if(typeof product == 'number'){
                                            return(
                                                <React.Fragment key = {(index + 3221) * 3777}>
                                                    <span key = {(index + 737) * 213} className='mt-2 mb-2'>Total comes at {product}$</span>
                                                    
                                                </React.Fragment>
                                                
                                            )
                                        }
                                    })}
    
                                        <div key = {(index + 53255) * 84} className='w-full flex flex-row justify-center mb-2'>
                                            <button key={(index + 36216) * 999} className='w-1/3 h-10 rounded-lg bg-red-400 text-white transition-all duration-300 hover:bg-red-500' onClick={()=>{
                                                const newElement = index
                                                context.cancelingOrder(newElement)
                                            }}>Cancel</button>
                                        </div>
                                </div>
    
                            </React.Fragment>
                        )
                    }else{
                        return( 
                            <React.Fragment key = {(index + 3124242) * 83824824}>
                                <div key = {(index + 4)  * 8757} className='bg-slate-300 w-[80%] flex flex-row overflow-x-auto rounded-t-lg'>
                                    
    
                                    {element.map((product, index)=>{
                                        if(typeof product == 'number'){
                                            return(
                                                ''
                                            )
                                        }else{
                                            return(
                                                <div key = {(index + 21) * 22131} className='basis-[30%] h-[300px] bg-red-400 ml-4 mr-3 rounded-lg mt-2 grow-0 shrink-0'>
                                                    <figure key={(index + 883) * 7828} className='w-full h-[75%]'>
                                                        <img key = {(index + 83832) * 32}src={product?.mainProduct?.productImg} className='w-full h-full object-cover rounded-lg'/>
                                                    </figure>
                                                    <p key = {(index + 323) * 32424}className='text-center'>{product?.mainProduct?.productName.length > 29 ? `${product?.mainProduct?.productName.substring(0, 28)}...` : product?.mainProduct?.productName}</p>
                                                    <p key = {(index + 788) * 8382}className='text-center'>You've ordered <span key = {(index + 88221) * 673276376}className='font-semibold'>{product?.mainProduct?.productAmount}</span> of this product</p>
                                                    <p key = {(index + 8989) * 783283}className='text-center'>for <span key = {(index + 321) * 3244324} className='font-semibold'>{product?.mainProduct?.productPrice}</span>$ each</p>
                                                </div>
                                                
                                            )
                                        }
    
                                        
                                    })}
    
                                    
                                </div>
    
                                <div key = {(index + 45) * 4324} className='bg-slate-300 w-[80%] flex flex-row flex-wrap !rounded-b-lg mb-5 justify-center'>
                                    {element.map((product, index)=>{
                                        if(typeof product == 'number'){
                                            return(
                                                <React.Fragment key = {(index + 3221) * 3777}>
                                                    <span key = {(index + 737) * 213} className='mt-2 mb-2'>Total comes at {product}$</span>
                                                    
                                                </React.Fragment>
                                                
                                            )
                                        }
                                    })}
    
                                        <div key = {(index + 53255) * 84} className='w-full flex flex-row justify-center mb-2'>
                                            <button key={(index + 36216) * 999} className='w-1/3 h-10 rounded-lg bg-red-400 text-white transition-all duration-300 hover:bg-red-500' onClick={()=>{
                                                const newElement = index
                                                context.cancelingOrder(newElement)
                                            }}>Cancel</button>
                                        </div>
                                </div>
    
                            </React.Fragment>
                        )
                    }
                    
                }) : <div className='bg-red-800 text-white font-semibold w-1/2 h-64 rounded-lg flex flex-wrap flex-col items-center'>
                        <span className='w-[90%] text-center mt-5'>It appears that you don't have any orders yet. We suggest you keep on looking through our products until you find the one you may be interested in</span>
                        <button className='mt-10 bg-blue-500 w-1/2 h-12 font-semibold rounded-lg transition-all duration-300 hover:bg-blue-700'>
                            <NavLink className='flex w-full h-full justify-center items-center' to='/Home'>Return to main page</NavLink>
                        </button>
                    </div>}

                <ProductDetail/>
                <Cart/>
            </section>

            {context.isCheckOutActive ? <CheckOutView/> : <div></div>}
        </Layout>
)
}

export {MyOrders}