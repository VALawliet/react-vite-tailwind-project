import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import { useContext } from 'react'

function ProductDetail(){
    const context = useContext(ShoppingCartContext);
    const deepCopy = [...context.items];

    
    
    return(
        <aside className= {`${context.isProductDetailOpen ? 'flex' : 'hidden' } w-[360px] h-[calc(100vh-68px)] flex-col fixed bg-white top-[68px] right-0 border border-black rounded-lg z-10 overflow-y-auto`}>
            <div className='flex justify-between items-center p-6 relative'>
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

            <button onClick={
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
                                alert('yata, bro')
                            }
                            
                            
                            
                        }

                        return product
                    })

                    
                    context.setItems(newDataList)
                }
            }>{context.productToShow[0]?.amount ? 'Add Product' : 'Out Of Stock'}</button>
            
        </aside>
    )
}

export {ProductDetail}