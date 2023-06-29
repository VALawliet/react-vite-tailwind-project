import { CheckIcon, XMarkIcon  } from "@heroicons/react/24/solid";
import { TrashIcon  } from "@heroicons/react/24/outline";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";

function CheckOutView(){
    const context = useContext(ShoppingCartContext);
    function showProduct(name){
        const deepcopy = [...context.items];
        const data = deepcopy.filter((element)=>{
            return element?.title == name
        });

        context.setProductToShow(data);
        context.openProductDetail()
    }
    


    return(
        <>
            
            <div className='fixed top-1/2 left-1/2 w-[500px] h-[260px] bg-slate-400/90 ml-[-250px] mt-[-130px] flex flex-row overflow-x-auto rounded-lg overflow-y-visible'>
                {context.checkOutProducts.length > 0? 

                    context.checkOutProducts.map((element)=>{
                        return(
                        <div key={element?.mainProduct?.productName} className='h-[235px] mt-2 ml-2 mr-2 !basis-[100px] grow-0 shrink-0 bg-slate-200 rounded-lg flex flex-row flex-wrap justify-center' onClick={()=>{
                            showProduct(element?.mainProduct?.productName)
                        }}>
                            <figure className='relative w-full h-[100px]'>
                                <img src={element?.mainProduct?.productImg} className='object-cover w-full rounded-lg h-full'/>
                            </figure>
                            <p className='text-sm font-semibold text-center'>{element?.mainProduct?.productName.length > 20 ? `${element?.mainProduct?.productName.substring(0, 19)}...` : element?.mainProduct?.productName}</p>
                            <p className='text-base font-light text-center'>You've selected {element?.mainProduct.productAmount} for</p>
                            <p className='text-base font-semibold text-center'>{element?.mainProduct?.productPrice}$</p>
                            <button className='w-[90%] bg-red-300 flex flex-row justify-center rounded-lg mb-2 transition-all duration-300 hover:bg-red-500 hover:text-white' onClick={(event)=>{
                                event.stopPropagation()
                                const data = {
                                    productName: element?.mainProduct?.productName
                                }
                                context.deletingOneFromCheckOut(data);
                            }}><TrashIcon className='w-5'/></button>
                        </div>)
                    })
                
                
                
                
                
                : <div className='flex flex-col flex-wrap items-center'>
                    <h3 className='w-full text-center text-xl px-2 py-2'>It appears that you haven't added any items to your checkout list. We recommend you keep on browsing through our product list until you find the items you want.</h3>
                    <button className='w-1/3 bg-lime-500 text-white rounded-lg h-12 mt-4 transition-all duration-300 hover:bg-lime-600 hover:text-white/90 hover:font-semibold' onClick={()=>{
                        context.setCheckOutActive(false)
                    }}>OK</button>
                  </div>
                    
                    }
                

                
            </div>

            {context.checkOutProducts.length > 0? 
            <>
                <div className="fixed top-1/2 left-1/2 w-[500px] h-[70px] z-60 bg-slate-400/90 ml-[-250px] mt-[135px] flex flex-col flex-wrap rounded-lg">
                    <h5 className='w-full text-center'>Total price: {context.checkOutSum}$</h5>
                    <div className='w-full flex flex-wrap flex-row justify-around'>
                        <button className='bg-lime-300 w-1/3 flex flex-row flex-wrap justify-center rounded-lg transition-all duration-300 hover:bg-lime-500 hover:text-white' onClick={()=>{
                            const data = [...context.checkOutProducts, context.checkOutSum]
                            context.addingToFinalList(data)
                        }}><CheckIcon className='w-8'/></button>
                        <button className='bg-red-300 w-1/3 text-center flex flex-row flex-wrap justify-center rounded-lg transition-all duration-300 hover:bg-red-600 hover:text-white' onClick={()=>{
                            context.deletingFromCheckOut();
                            context.setCheckOutActive(false)
                        }}><TrashIcon className='w-8'/></button>
                    </div>
                </div>

                <div className='fixed right-[455px] top-[245px] z-auto whitespace-nowrap text-slate-800 transition-all duration-300 hover:text-red-600'>
                        <button className='w-full' onClick={()=>{
                            context.setCheckOutActive(false)
                        }}>

                            <XMarkIcon className='w-8'/>
                        
                        </button>
                </div>
            
            
            
            
            </>
            : ''}
            
        
        </>
    )
}

export {CheckOutView}