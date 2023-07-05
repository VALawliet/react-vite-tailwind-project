
import { Layout } from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context"
import { useContext } from "react"
import { ProductDetail } from "../../Components/Productdetail"
import { Cart } from "../../Components/Cart"
import { CheckOutView } from "../../Components/CheckOutView"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { NavLink } from "react-router-dom"

function MyAccount(){
    const context = useContext(ShoppingCartContext);
    const day = context?.user[0]?.day || null;
    
    function addingCorrectEnding(day){
        let result;

        if(day != null){
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
        

    }

    function togglePass(){
        const input = document.querySelector('input');

        if(input.type == 'password'){
            input.type = 'text'
            input.style.fontWeight = '600'
            context.setPassVisible(true)
        }else{
            input.type = 'password'
            context.setPassVisible(false)
        }
    }

    return(
        <Layout>
            <section className='flex w-9/12 h-auto flex-wrap justify-center'>
                <div className='bg-slate-700 w-full rounded-lg text-white flex flex-wrap justify-center'>
                    <h1 className='w-full text-center text-xl mt-2'>
                        {context.user.length > 0? 
                        
                            <span>
                                Welcome, <span className='font-semibold underline'>{context?.user[0]?.userName}</span>
                            </span>
                         : 
                            <span>
                                
                                Welcome, <span className='font-semibold underline'>Guest</span>
                            
                            </span>}
                    </h1>
                    
                    
                    <h2 className='w-full text-center text-lg mt-2 font-semibold'>Account information</h2>

                    {context.user.length > 0?
                       <div className='flex w-full flex-col flex-wrap items-center'>
                            <p className='w-[75%] h-12 bg-red-50 mt-2 mb-3 rounded-lg text-center text-black flex flex-row justify-center items-center'>Username: <span className='font-semibold ml-2'> {context?.user[0]?.userName}</span></p>
                            <div className='w-[75%] flex flex-row flex-wrap justify-center relative rounded-lg h-12 items-center mt-2 mb-3'>
                                <div className='w-[70%] bg-white flex flex-row flex-wrap h-12 justify-around items-center rounded-lg'>
                                    <p className='text-black rounded-tl-lg rounded-bl-lg w-20'>Password: </p>
                                    <input type='password' readOnly value={context.user[0]?.password} className='text-black w-[90%] text-center rounded-lg'/>
                                </div>
                                <div className='w-[30%]'>
                                    <button className={context.isPassVisible == false ? 'bg-white rounded-lg w-12 flex flex-row justify-center ml-4 text-black transition-all duration-300 hover:bg-lime-500 hover:text-white' : 'bg-white rounded-lg w-12 flex flex-row justify-center ml-4 text-black transition-all duration-300 hover:bg-red-500 hover:text-white'} onClick={()=>{
                                        togglePass()
                                    }}>

                                        {context.isPassVisible == false ? 
                                            <EyeIcon className='w-8'/> 
                                        
                                            :
                                            
                                            <EyeSlashIcon className='w-8'/>}
                                        
                                    </button>
                                </div>
                                
                            </div>
                            
                            <p className='text-center w-[75%] h-24 mt-2 mb-3 px-2 bg-white text-black flex flex-col flex-wrap items-center justify-center rounded-lg'><span className='grow-0 shrink-0'>Your account was created on</span> <span className='font-semibold shrink-0 grow-0'>{context?.user[0]?.month} the {addingCorrectEnding(day)} at {context?.user[0]?.hour} and {context?.user[0]?.minutes} minutes</span> </p>

                            <button className='bg-red-400 w-[45%] rounded-lg mt-2 mb-3 h-12 transition-all duration-300 hover:bg-red-600' onClick={()=>{
                                context.setTryingToDeleteAcc(true)
                            }}>Delete account</button>
                        </div>
                        
                    
                    
                        :
                        <>
                            <div className='w-full flex flex-row justify-center mt-2 mb-3'>
                                <p className='w-[60%] bg-white text-black text-center rounded-lg flex flex-row flex-wrap items-center'>

                                    <span className='px-4 py-2'>It appears that you don't have an account with us yet. You should consider creating one</span>

                                </p>
                            </div>
                            
                            <div className='w-full flex flex-row justify-center mt-2 mb-3'>
                                <button className='w-[45%] bg-blue-400 text-white h-12 rounded-lg transition-all duration-300 hover:bg-blue-600'>
                                    <NavLink className='w-full h-full flex flex-row flex-wrap items-center justify-center' to='../SignUp'>Go to Sign Up</NavLink>
                                    
                                </button>
                            </div>
                            
                        </>
                        
                        
                        
                        }
                    
                    
                </div>


                <ProductDetail/>
                <Cart/>
                
            </section>


            {context.isCheckOutActive ? <CheckOutView/> : <div></div>}

            {context.isTryingToDeleteAcc? 
            
                <div className="w-[300px] h-[190px] bg-red-300 rounded-lg fixed top-1/2 left-1/2 mt-[-150px] ml-[-150px]">
                    <h4 className='text-white text-center text-xl mt-2'>Warning!</h4>
                    <p className='px-2 text-center'>You're about to delete your account. Are you sure you want to proceed?</p>
                    <div className='w-full flex justify-around flex-row flex-wrap mt-4'>
                        <button className='w-24 h-12 rounded-lg bg-red-800 text-white transition-all duration-300 hover:bg-red-600' onClick={()=>{
                            
                            context.setUser([]);
                            localStorage.removeItem('USER');
                            context.setTryingToDeleteAcc(false)
                        }}>Yes</button>
                        <button className='w-24 h-12 rounded-lg bg-lime-800 text-white transition-all duration-300 hover:bg-lime-600' onClick={()=>{
                            context.setTryingToDeleteAcc(false);
                        }}>No</button>
                    </div>
                </div> 
                
                
                : <div></div>}

        </Layout>
    )
}

export {MyAccount}