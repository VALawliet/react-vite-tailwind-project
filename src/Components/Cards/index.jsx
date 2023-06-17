import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"


function Cards({category, img, product, price, description}){
    const context = useContext(ShoppingCartContext);
    const showProduct = ()=>{
        const data = {
            productCategory: category,
            productImg: img,
            productName: product,
            productPrice: price,
            productDescription: description
        }

        context.setProductToShow(data)
        context.openProductDetail() 
    }
    
    return(
        <div className='bg-white cursor-pointer w-56 h-60 rounded-lg mb-5'
            onClick={()=>{
                showProduct()
            }}>
            <figure className='relative mb-2 w-full h-4/5'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 p-1'>{category}</span>
                <img className='w-full h-full object-cover rounded-lg' src = {img} alt = 'headphones'/>
                <button className='absolute m-2 p-1 top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full' 
                    onClick={(event)=>{
                        event.stopPropagation();
                        
                        
                        const data = {
                            productName: product,
                            productCategory: category,
                            productImg: img,
                            productPrice: price,
                            productDescription: description
                        }
                        console.log('click');

                        

                        const values = context.productToAdd.filter((element)=>{
                            return element.productName == data.productName
                            
                        })
                        console.log(values)

                        if(values.length >= 1){
                            alert('yata, bro')
                        }else{
                            context.addingProduct(data)
                        }

                        
                    }}>
                    <span className='block h-[27px]'>+</span>
                </button>
            </figure>
            <p className='flex justify-between'>
                <span className='text-sm font-light' onClick={(event)=>{
                    event.stopPropagation();
                    const data = {
                        productName: product,
                        productCategory: category,
                        productImg: img,
                        productPrice: price,
                        productDescription: description
                    }
                    context.deletingProduct(data);
                    
                }}>{product}</span>
                <span className='text-lg font-medium'>{price}$</span>
            </p>
        </div>
    )
}

export {Cards}