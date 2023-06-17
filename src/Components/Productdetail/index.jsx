import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import { useContext } from 'react'

function ProductDetail(){
    const context = useContext(ShoppingCartContext);
    console.log('PRODUCT TO SHOW: ', context.productToShow)
    
    return(
        <aside className= {`${context.isProductDetailOpen ? 'flex' : 'hidden' } w-[360px] h-[calc(100vh-68px)] flex-col fixed bg-white top-[68px] right-0 border border-black rounded-lg z-10 overflow-y-auto`}>
            <div className='flex justify-between items-center p-6 relative'>
                <h2 className='font-medium text-xl fixed bg-white/60 rounded-lg p-2 m-2'>Details</h2>
                <XMarkIcon className='w-6 h-6 cursor-pointer fixed right-4 bg-white/60 rounded-lg m-2' onClick={()=>{
                    context.closeProductDetail()
                }}/>
            </div>

            <figure className='px-6'>
                <img className='w-full h-full object-cover rounded-lg' src= {context.productToShow.productImg} alt = {context.productToShow.productName}/>

            </figure>
            <div className='flex flex-row flex-wrap p-4'>
                <h3 className='w-full text-center text-black-500 font-semibold'>
                    {context.productToShow.productName}
                </h3>

                <span className='text-center my-3'>
                    {context.productToShow.productDescription}
                </span>

                <span className=' w-full text-center my-3 flex flex-row flex-wrap justify-center'>
                    <p>Price: </p> <p className='mx-2 font-semibold'> {context.productToShow.productPrice}$</p>
                </span>
            </div>
            
        </aside>
    )
}

export {ProductDetail}