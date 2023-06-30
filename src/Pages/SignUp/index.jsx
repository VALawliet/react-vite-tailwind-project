import { useContext } from "react"
import { Layout } from "../../Components/Layout"
import { Navbar } from "../../Components/Navbar"
import { ShoppingCartContext } from "../../Context"

function SignUp(){

    const context = useContext(ShoppingCartContext);
    return(
        
        <Layout>
            <section className='flex w-9/12 h-auto flex-wrap justify-center'>
                <div className='w-[90%] bg-sky-500 rounded-lg flex flex-wrap justify-center'>
                    {context.user.length == 0 ? 
                    
                
                
                        <>
                            <h2 className='w-full text-center text-white font-semibold'>Sign Up</h2>
                            <div className='w-[60%] mb-2 mt-2 flex flex-row justify-center bg-white'>
                                <form>
                                    <label for = 'username' className='text-black'>Username:</label>
                                    <input id = 'username' className = 'rounded-lg ml-2' type="text"/>
                                </form>
                            </div>
                            

                        </>
                
                
                
                    :
                
                        <>uwu</>
                
                }
                </div>
            </section>
        </Layout>
    )
}

export {SignUp}