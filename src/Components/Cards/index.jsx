import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"

function Cards({category, img, product, itemID, price}){
    const context = useContext(ShoppingCartContext)
    return(
        <div className='bg-white cursor-pointer w-56 h-60 rounded-lg'>
            <figure className='relative mb-2 w-full h-4/5'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 p-1'>{category}</span>
                <img className='w-full h-full object-cover rounded-lg' src = {img} alt = 'headphones'/>
                <button className='absolute m-2 p-1 top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full' 
                    onClick={()=>{
                        context.setCounter(context.counter + 1)
                    }}>
                    <span className='block h-[27px]'>+</span>
                </button>
            </figure>
            <p className='flex justify-between'>
                <span className='text-sm font-light'>{product}, {itemID}</span>
                <span className='text-lg font-medium'>{price}$</span>
            </p>
        </div>
    )
}

export {Cards}