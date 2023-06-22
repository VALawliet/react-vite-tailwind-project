import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"


function Cards({category, img, product, price, description, amount, deepCopy}){
    const context = useContext(ShoppingCartContext);
    const showProduct = ()=>{
        const data = deepCopy.filter((element)=>{
            return element?.title == product
        })

        context.setProductToShow(data)
        context.openProductDetail() 
    }
    
    return(
        <div className='bg-teal-50 cursor-pointer w-60 h-60 rounded-lg mb-8'
            onClick={()=>{
                showProduct()
            }}>
            <figure className='relative mb-2 w-full h-3/4'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 p-1'>{category}</span>
                <img className='w-full h-full object-cover rounded-lg' src = {img} alt = {product}/>
                <button className={amount? 'absolute m-2 p-1 top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full transition-all duration-300 hover:bg-lime-600 hover:text-white hover:font-semibold' : 'absolute m-2 p-1 top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full transition-all duration-300 hover:bg-red-600 hover:text-white hover:font-semibold' } 
                    onClick={(event)=>{
                        event.stopPropagation();
                        
                        
                        const data = {
                            productName: product,
                            productCategory: category,
                            productImg: img,
                            productPrice: price,
                            productDescription: description,
                            productAmount: amount - 1
                        }

                        const newDataList = deepCopy.map((product)=>{
                            if(product?.title == data.productName || product?.productName == data.productName){
                                if(product.amount > 0){
                                    product.amount = amount - 1;
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

                        
                        
                    }}>
                    <span className='block h-[27px]'>+</span>
                </button>
            </figure>
            <p className='flex flex-row flex-wrap justify-between'>
                <span className='text-sm font-light w-[70%]' onClick={(event)=>{
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

export {Cards}