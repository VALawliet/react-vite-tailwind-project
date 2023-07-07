import { useContext } from "react"
import { Layout } from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"

import { ProductDetail } from "../../Components/Productdetail"
import { Cart } from "../../Components/Cart"
import { CheckOutView } from "../../Components/CheckOutView"
import { NavLink } from "react-router-dom"

function SignUp(){

    

    const context = useContext(ShoppingCartContext);
    
    function togglePass(){
        const input = document.querySelector('#userPass');

        if(input.type == 'password'){
            input.type = 'text'
            input.style.fontWeight = '600'
            context.setPassVisible(true)
        }else{
            input.type = 'password'
            input.style.fontWeight = 'normal'
            context.setPassVisible(false)
        }
    }

    
    return(
        
        <Layout>
            <section className='flex w-9/12 h-auto flex-wrap justify-center'>
                <div className='w-[100%] bg-slate-700 rounded-lg flex flex-wrap justify-center'>
                    {context.user.length == 0 ? 
                    
                
                
                        <>
                            <h2 className='w-full text-center text-white font-semibold mt-2 mb-2'>Sign Up</h2>
                            <div className='w-[100%] mb-2 mt-2 flex flex-col h-[250px] items-center rounded-lg'>
                                <form className='h-full w-full flex flex-col items-center'>

                                    <div className='flex flex-row justify-center w-[100%] h-[20%] items-center mt-4'>
                                        <label for = 'username' className='text-white'>Username:</label>
                                        <input id = 'username' className = 'w-[calc(100%-145px)] px-1 rounded-lg ml-2 h-full border-x border-y border-solid border-slate-200 transition-all duration-300 outline-none focus:outline-blue-500 focus:outline-2 focus:outline-offset-[-2px]' type="text" placeholder='username123' value={context.userValue} onChange={(event)=>{

                                            context.setUserValue(event.target.value);
                                            
                                        }}/>
                                    </div>

                                    <div className="flex flex-row justify-center w-[95%] h-[20%] items-center mt-4 relative">

                                        <label for= 'userPass' className='text-white ml-[-18px]'>Password:</label>
                                        <input id='userPass' className={`w-[calc(100%-150px)] px-1 rounded-lg ml-3 border-x border-y border-solid border-slate-200 transition-all duration-300 h-full outline-none ${context.isPassVisible ? ' focus:outline-red-500 focus:outline-2 focus:outline-offset-[-2px]' :' focus:outline-lime-500 focus:outline-2 focus:outline-offset-[-2px]'}`} type = 'password' placeholder="password123" value={context.userPass} onChange={(event)=>{
                                            context.setUserPass(event.target.value)
                                        }}/>

                                        <button className={context.isPassVisible == false ?'text-white absolute right-0 border-solid border-x border-y rounded-lg border-slate-300 transition-all duration-300 hover:bg-lime-400 hover:text-white' : 'text-white absolute right-0 border-solid border-x border-y rounded-lg border-slate-300 transition-all duration-300 hover:bg-red-400 hover:text-white'  } type='button' onClick={()=>{
                                            togglePass()
                                        }}>
                                            
                                            {context.isPassVisible == false ?
                                                <EyeIcon className='w-8'/> 
                                            
                                                :

                                                <EyeSlashIcon className='w-8'/>
                                            
                                            }
                                            
                                        </button>
                                    </div>

                                    <button type="button" className={`w-[45%] h-16 mt-10 rounded-lg ${context.userValue.trim() != '' && context.userPass.trim() != '' && context.userValue.length < 20 ? 'bg-lime-400 transition-all duration-300 hover:bg-lime-500 text-white' : 'bg-red-400 transition-all duration-300 hover:bg-red-600 text-white'}`} onClick={()=>{
                                        if(context.userValue.trim() == '' || context.userPass.trim() == '' || context.userValue.length >= 20){
                                            console.log('invalid');

                                        }else{
                                            let fullDate = new Date();
                                            let hour = String(fullDate.getHours()).length > 1 ? String(fullDate.getHours()) : `0${String(fullDate.getHours())}`;
                                            let day = String(fullDate.getDate());
                                            let minutes = String(fullDate.getMinutes()).length > 1 ? String(fullDate.getMinutes()) : `0${String(fullDate.getMinutes())}` ;
                                            let month = String(fullDate.getMonth());

                                            function detectingMoth(month){

                                                let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                                                return monthList[month]
                                            }

                                            let userInfo = {
                                                userName: context.userValue.trim(),
                                                password: context.userPass.trim(),
                                                month: detectingMoth(month),
                                                day: day,
                                                hour: hour,
                                                minutes: minutes
                                            }

                                            let newUserList = [userInfo];

                                            console.log(newUserList)

                                            let stringJson = JSON.stringify(newUserList);

                                            console.log(stringJson)

                                            localStorage.setItem('USER', stringJson);

                                            context.setUser(newUserList);
                                            context.setUserValue('');
                                            context.setUserPass('')
                                        }
                                    }}> 
                                        {context.userValue.trim() != '' && context.userPass.trim() != '' && context.userValue.length < 20? 'Register!' : 'Invalid username or password'}
                                    </button>
                                    
                                </form>

                                
                            </div>
                            

                        </>
                
                
                
                    :
                
                        <>
                            <h2 className='w-full text-center text-white text-xl mt-2'>Hey there, <span className='underline font-semibold'>{context?.user[0]?.userName}!</span></h2>

                            
                            <p className='w-full text-center px-2 text-lg text-white mt-2 mb-2'>It looks like you already have an account with us. We're glad that you decided to join us in our journey</p>
                            
                            <p className='w-full text-center px-2 text-lg text-white mt-2 mb-2'>If you want to check your account's information, you can do so clicking the <span className='font-semibold underline'>button</span> below</p>

                            <div className='w-full flex flex-row flex-wrap justify-center mb-2 mt-2'>
                                <button className='bg-sky-400 text-white w-[50%] rounded-lg h-16 transition-all duration-300 hover:bg-sky-500'>
                                    
                                    <NavLink className='flex w-full h-full items-center justify-center' to='../MyAccount'>
                                        Check out your account!
                                    </NavLink>
                                    
                                </button>
                            </div>
                            
                        </>
                
                }
                </div>

                <ProductDetail/>
                <Cart/>
            </section>

            {context.isCheckOutActive ? <CheckOutView/> : <div></div>}
        </Layout>
    )
}

export {SignUp}