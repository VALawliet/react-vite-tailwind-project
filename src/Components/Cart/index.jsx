import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import { TrashIcon } from "@heroicons/react/24/outline"
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'


function Cart(){

    const contexto = useContext(ShoppingCartContext);
    function showProduct(name){
        const deepcopy = [...contexto.items];
        const data = deepcopy.filter((element)=>{
            return element?.title == name
        });

        contexto.setProductToShow(data);
        contexto.openProductDetail()
    }
    return(
        <>
            <aside className= {`${contexto.isShoppingCartOpen ? 'flex' : 'hidden'} w-[360px] h-[calc(100vh-70px)] flex-row flex-wrap fixed bg-white top-[70px] right-0 border border-black rounded-lg z-10 overflow-y-auto justify-center`}>
                {contexto.productToAdd.length > 0 ? contexto.productToAdd.map((element)=>{
                    return (
                        <div key={element.mainProduct.productName} className='w-[90%] h-[355px] bg-slate-200 mt-4 mb-2 border rounded-lg flex flex-col flex-wrap items-center'>
                            <figure className='flex flex-row flex-wrap w-[60%] h-56'>
                                <img className= 'w-full h-full object-contain rounded-lg' src={element.mainProduct.productImg} onClick={()=>{
                                    showProduct(element.mainProduct.productName)
                                    
                                }}/>
                            </figure>
                            <p className='text-center mt-1 px-2'>{element.mainProduct.productName.length > 40 ? `${element.mainProduct.productName.substr(0, 39)}...`: element.mainProduct.productName}</p>
                            <p className='text-center mt-1 px-2'>You have selected <span className='font-semibold'>{element.amount}</span> unities of this product</p>
                            <button className='w-[20%] mt-3 h-8 relative bg-white text-black rounded-lg transition-all duration-300 hover:bg-red-600 hover:text-white' onClick={()=>{
                                const data = {
                                    productName: element.mainProduct.productName,
                                    productCategory: element.mainProduct.productCategory,
                                    productImg: element.mainProduct.productImg,
                                    productPrice: element.mainProduct.productPrice,
                                    productDescription: element.mainProduct.productDescription
                                }
                                contexto.deletingProduct(data);
                            }}><TrashIcon className='w-6 absolute right-1/3 top-1'/></button>
                        </div>
                    )
                }) : 
                    <div className='flex flex-col flex-wrap items-center'>
                        <h2 className='w-full text-center font-semibold mt-2 text-lg px-2'>It appears that you haven't added any products to your shopping cart yet...</h2>
                        <h3 className='w-full text-center mt-2 text-base px-2'>We recommend you keep on searching until you find all the products you'd like to purchase!</h3>
                        <button className='w-1/2 mt-4 h-16 bg-slate-400 rounded-lg text-white transition-all duration-300 hover:bg-slate-600' onClick={()=>{
                            contexto.closeShoppingCart()
                        }}>
                            Keep on browsing
                        </button>
                    </div>   }

            </aside>

            {contexto.productToAdd.length > 0 ? 
            <> 
                <div className={contexto.isShoppingCartOpen ? 'flex fixed top-1/2 right-[360px] w-[100px] h-40 z-40 flex-col flex-wrap items-end' : 'hidden'}>
                    <button className='bg-slate-200 relative rounded-lg w-10 h-10 px-2 transition-all duration-300 hover:bg-lime-500 hover:text-white' onClick={()=>{
                        
                        contexto.addingProductsToCheckOut();
                        contexto.setCheckOutActive(true);
                        contexto.closeShoppingCart()
                    }}><CheckIcon className='w-8 absolute left-1 top-1'/></button>
                    <button className='bg-slate-200 relative rounded-lg w-10 h-10 px-2 mt-1 transition-all duration-300 hover:bg-slate-500 hover:text-white' onClick={()=>{
                        contexto.closeShoppingCart()
                        contexto.setTryingToDelete(false)
                    }}><XMarkIcon className='w-8 absolute left-1 top-1'/></button>
                    <button className='bg-slate-200 relative rounded-lg w-10 h-10 px-2 mt-1 transition-all duration-300 hover:bg-red-600 hover:text-white' onClick={()=>{
                        contexto.setTryingToDelete(true);
                        contexto.disablingAllButtons()
                    }}><TrashIcon className='w-8 absolute left-1 top-1'/></button>                
            
                </div>

                <div className={contexto.isTryingToDelete ? 'flex flex-col flex-wrap fixed z-30 bg-slate-200 w-[300px] h-[150px] top-1/2 left-1/2 mt-[-75px] ml-[-150px] rounded-lg' : 'hidden'}>
                    <div className='w-full'>
                        <h4 className='text-center px-2 py-2'>You're about to delete every item in your shopping cart. Are you sure you want to proceed?</h4>
                    </div>
                    
                    <div className='w-full flex flex-row flex-wrap justify-around'>
                        <button className='bg-lime-300 w-1/3 rounded-lg h-12 transition-all duration-300 hover:bg-lime-600 hover:text-white' onClick={()=>{
                            contexto.deletingAllProducts();
                            contexto.setTryingToDelete(false)
                            contexto.closeShoppingCart();
                            contexto.disablingAllButtons()
                        }}>Yes</button>
                        <button className='bg-red-400 w-1/3 rounded-lg h-12 transition-all duration-300 hover:bg-red-600 hover:text-white' onClick={()=>{
                            contexto.setTryingToDelete(false);
                            contexto.disablingAllButtons()
                        }}>No</button>
                    </div>
                    
                </div>
            </>
             : ''}
            

        </>
    )
}

export {Cart}