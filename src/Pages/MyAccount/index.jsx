
import { Layout } from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context"
import { useContext } from "react"
import { ProductDetail } from "../../Components/Productdetail"
import { Cart } from "../../Components/Cart"
import { CheckOutView } from "../../Components/CheckOutView"
function MyAccount(){
    const context = useContext(ShoppingCartContext);
    const day = context?.user[0]?.day || null;
    
    function addingCorrectEnding(day){
        let result;

        if(day == '12'){
            result = `${day}th`
            
            return result

        }else if(day == '11'){
            result = `${day}th`;
            
            return result        
        
        }else if(day == '13'){

            result = `${day}th`

            return result

        }else if(day.slice(-1) == '1'){

            result = `${day}st`

            return result

        }else if(day.slice(-1) == '2'){
            result = `${day}nd`

            return result

        }else if(day.slice(-1) == '3'){
            result = `${day}rd`
            
            return result

        }else{
            result = `${day}th`

            return result
        }

    }
    return(
        <Layout>
            <section className='flex w-9/12 h-auto flex-wrap justify-center'>
                <div className='bg-slate-700 w-[90%] rounded-lg text-white flex flex-wrap justify-center'>
                    <h1 className='w-full text-center text-xl mt-2'>
                        {context.user? 
                        
                            <span>
                                Welcome, <span className='font-semibold underline'>{context?.user[0]?.userName}</span>
                            </span>
                         : 
                            <span>
                                
                                Welcome, <span className='font-semibold underline'>Guest</span>
                            
                            </span>}
                    </h1>
                    
                    
                    <h2 className='w-full text-center text-lg mt-2 font-semibold'>Account information</h2>

                    {context.user?
                       <div className='flex w-full flex-col flex-wrap items-center'>
                            <p className='w-[60%] bg-red-50 mt-2 mb-2 rounded-lg text-center text-black'>Username: <span className='font-semibold'>{context?.user[0]?.userName}</span></p>
                            <div className='w-full flex flex-row flex-wrap justify-center'>
                                <p className="w-[20%]"> alo</p>
                                <input type='password' readOnly value={context.user[0]?.password} className='text-black w-[40%] text-center'/>
                            </div>
                            
                            <p className='text-center w-full mt-2 mb-2'>Your account was created on <span className='font-semibold'>{context?.user[0]?.month}</span> the <span className='font-semibold'>{addingCorrectEnding(day)}</span> at <span className='font-semibold'>{context?.user[0]?.hour} and {context?.user[0]?.minutes} minutes</span> </p>
                        </div>
                        
                    
                    
                        :
                        
                        <p>You haven't signed in yet</p>
                        
                        
                        }
                    
                    
                </div>


                <ProductDetail/>
                <Cart/>
                
            </section>


            {context.isCheckOutActive ? <CheckOutView/> : <div></div>}

        </Layout>
    )
}

export {MyAccount}