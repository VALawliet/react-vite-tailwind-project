import { CheckIcon, XMarkIcon  } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";

function CheckOutView(){
    const context = useContext(ShoppingCartContext)
    


    return(
        <>
            <div className='fixed top-1/2 left-1/2 w-[500px] h-[250px] z-60 bg-slate-400/90 ml-[-250px] mt-[-125px] flex flex-row overflow-x-auto rounded-lg'>
                {context.checkOutProducts.map((element)=>{
                    return(
                    <div key={element?.mainProduct?.productName} className='h-[220px] mt-2 ml-2 mr-2 !basis-[100px] grow-0 shrink-0 bg-slate-200 rounded-lg'>
                        <figure className='relative w-full h-[100px]'>
                            <img src={element?.mainProduct?.productImg} className='object-cover w-full rounded-lg h-full'/>
                        </figure>
                        <p className='text-sm font-semibold text-center'>{element?.mainProduct?.productName.length > 20 ? `${element?.mainProduct?.productName.substring(0, 19)}...` : element?.mainProduct?.productName}</p>
                        <p className='text-base font-light text-center'>You've selected {element?.amount} for</p>
                        <p className='text-base font-semibold text-center'>{element?.mainProduct?.productPrice}$</p>
                    </div>)
                })}
            </div>

            <div className="fixed top-1/2 left-1/2 w-[500px] h-[70px] z-60 bg-slate-400/90 ml-[-250px] mt-[130px] flex flex-col flex-wrap rounded-lg">
                <h5 className='w-full'>Total price: {context.checkOutSum}$</h5>
                <h5 className='w-full'>buttons</h5>
            </div>
        
        </>
    )
}

export {CheckOutView}