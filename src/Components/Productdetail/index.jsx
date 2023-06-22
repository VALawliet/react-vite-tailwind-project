import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

import { useContext } from 'react'

function ProductDetail(){
    const context = useContext(ShoppingCartContext);
    const deepCopy = [...context.items];
    

    
    
    return(
        <>
            <aside className= {`${context.isProductDetailOpen ? 'flex' : 'hidden' } w-[360px] h-[calc(100vh-68px)] flex-col fixed bg-white top-[68px] right-0 border border-black rounded-lg z-10 overflow-y-auto items-center`}>
                <div className='flex justify-between items-center p-6 relative w-full'>
                    <h2 className='font-medium text-xl fixed bg-white/60 rounded-lg p-2 m-2'>Details</h2>
                    <XMarkIcon className='w-6 h-6 cursor-pointer fixed right-4 bg-white/60 rounded-lg m-2' onClick={()=>{
                        context.closeProductDetail()
                    }}/>
                </div>

                <figure className='px-6'>
                    <img className='w-full h-full object-cover rounded-lg' src= {context.productToShow[0]?.image} alt = {context.productToShow[0]?.title}/>

                </figure>
                <div className='flex flex-row flex-wrap p-4'>
                    <h3 className='w-full text-center text-black-500 font-semibold'>
                        {context.productToShow[0]?.title}
                    </h3>

                    <span className='text-center my-3'>
                        {context.productToShow[0]?.description}
                    </span>

                    <span className=' w-full text-center my-3 flex flex-row flex-wrap justify-center'>
                        <p>Price: </p> <p className='mx-2 font-semibold'> {context.productToShow[0]?.price}$</p>
                    </span>

                    <span className={context.productToShow[0]?.amount ? 'w-full text-center my-3 flex flex-row flex-wrap justify-center' : 'w-full text-center my-3 flex flex-row flex-wrap justify-center text-red-600'}>{context.productToShow[0]?.amount ? `There are ${context.productToShow[0]?.amount} unities left` : 'Sold Out'}</span>

                </div>
                
                <div className='w-full flex flex-wrap flex-row justify-center'>
                    <button className = {`block w-1/2 rounded-lg !h-16 mb-2 transition-all duration-300 ${context.productToShow[0]?.amount ? 'bg-slate-200 text-lime-600   hover:bg-lime-600 hover:text-white' : 'bg-red-500 text-black hover:text-white hover:bg-red-800'} `} onClick={
                        ()=>{
                            const data = {
                                productName: context.productToShow[0]?.title,
                                productCategory: context.productToShow[0]?.category,
                                productImg: context.productToShow[0]?.image,
                                productPrice: context.productToShow[0]?.price,
                                productDescription: context.productToShow[0]?.description,
                                productAmount: context.productToShow[0]?.amount - 1
                            }

                            const newDataList = deepCopy.map((product)=>{
                                if(product?.title == data.productName || product?.productName == data.productName){
                                    if(product.amount > 0){
                                        product.amount = context.productToShow[0]?.amount - 1;
                                        context.setCounter(context.counter + 1);

                                        switch (product.amount){
                                            case 0:
                                                context.addingProduct({
                                                    mainProduct: data,
                                                    amount: 3
                                                });

                                                break
                                            
                                            case 1:
                                                context.addingProduct({
                                                    mainProduct: data,
                                                    amount: 2
                                                })
                                                
                                                break
                                            case 2:
                                                context.addingProduct({
                                                    mainProduct: data,
                                                    amount: 1
                                                })

                                                break

                                            default:
                                                break
                                        }
                                        
                                    }else{
                                        context.setActive(true)
                                    }
                                    
                                    
                                    
                                }

                                return product
                            })

                            
                            context.setItems(newDataList)
                        }
                    }>{context.productToShow[0]?.amount ? 'Add Product' : 'Out Of Stock'}</button>
                </div>
                
                
            </aside>

            <div className={context.isActive ? 'fixed left-1/2 top-1/2 w-[250px] h-[150px] bg-slate-300/75 ml-[-125px] mt-[-75px] rounded-lg flex flex-wrap flex-col items-center' : 'hidden'}>
                <h4 className='text-center px-2 py-3'>The product you're trying to select is out of stock. Please select <span className='font-semibold'>another product</span></h4>
                <button className='bg-slate-600 text-white w-1/2 rounded-lg h-10 transition-all duration-300 hover:bg-lime-600' onClick={()=>{
                    context.setActive(false)
                }}>Okay</button>
            </div>

        </>
    )
}

export {ProductDetail}