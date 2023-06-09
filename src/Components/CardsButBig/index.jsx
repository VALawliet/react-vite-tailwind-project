import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"


function CardsButBig({category, img, product, price, description, amount, deepCopy}){
    const context = useContext(ShoppingCartContext);
    const showProduct = ()=>{
        const data = deepCopy.filter((element)=>{
            return element?.title == product
        })

        context.setProductToShow(data)
        context.openProductDetail() 
    }
    
    return(
        <div className='bg-teal-50 cursor-pointer w-96 h-96 rounded-lg mb-8'
            onClick={()=>{
                showProduct();
                context.setCheckOutActive(false)
            }}>
            <figure className='relative mb-2 w-full h-4/5'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-lg m-2 p-1'>{category}</span>
                <img className='w-full h-full object-fill rounded-lg' src = {img} alt = {product}/>
                <button className={amount? 'absolute m-2 p-1 top-0 right-0 flex justify-center items-center bg-white w-10 h-10 rounded-full transition-all duration-300 hover:bg-lime-600 hover:text-white hover:font-semibold but' : 'absolute w-10 h-10 m-2 p-1 top-0 right-0 flex justify-center items-center bg-white rounded-full transition-all duration-300 hover:bg-red-600 hover:text-white hover:font-semibold but'}
                    onClick={(event)=>{
                        event.stopPropagation();
                        context.setCheckOutActive(false)
                        
                        
                        const data = {
                            productName: product,
                            productCategory: category,
                            productImg: img,
                            productPrice: price,
                            productDescription: description,
                            productAmount: amount
                        }

                        

                        if(data.productAmount > 0){
                            context.addingProduct(data)
                        }else{
                            context.setActive(true)
                        }
                        

                        
                        
                    }}>
                    <span className='block h-[27px]'>+</span>
                </button>
            </figure>
            <p className='flex flex-row flex-wrap justify-between'>
                <span className='text-lg font-light w-[70%]' onClick={(event)=>{
                    event.stopPropagation();
                    const data = {
                        productName: product,
                        productCategory: category,
                        productImg: img,
                        productPrice: price,
                        productDescription: description
                    }
                    context.deletingProduct(data);
                    
                }}>{(product.length > 40) ? `${product.substr(0, 39)}...` : product }</span>
                <span className='text-lg font-medium'>{price}$</span>
                
            </p>
        </div>
    )
}

export {CardsButBig}