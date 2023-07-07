import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

function Navbar(){

    const activeStyle = 'underline underline-offset-4';
    const contexto_uwu = useContext(ShoppingCartContext)

    const menu1 = [
        {
            to: "/Home",
            name: 'Shopi',
            className: 'font-semibold text-lg'
        },

        {
            to: '/Home',
            name: 'All',
            className: ''
        
        },

        {
            to: '/clothes',
            name: 'Clothes',
            className: ''

        },

        {
            to: '/electronics',
            name: 'Electronics',
            className: ''
        },

        {
            to: '/jewelry',
            name: 'Jewelry',
            className: ''
        }
    ]

    const menu2 = [

        {
            name: contexto_uwu.user.length > 0? contexto_uwu?.user[0]?.userName : 'Guest',
            className: 'text-black/60'
        },

        {
            name:'Check Out',
            className: ''
        },

        {
            to: '/MyOrders',
            name: 'My Orders',
            className: ''
        },

        {
            to: '/MyAccount',
            name: 'My Account',
            className: ''
        },
        
        {
            to: '/SignUp',
            name: 'Sign Up',
            className: ''
        },

        {
            name: 'Carrito gei',
            icon: ShoppingCartIcon,
            className: ''
        }







    ]
    return(
        <nav className="flex flex-col items-center fixed z-10 w-full py-5 px-8 text-base font-medium top-0 bg-white lg:flex-row lg:justify-between">
            <ul className="flex justify-center items-center gap-3 w-full lg:w-1/3 lg:justify-normal">
                {menu1.map((element)=>{
                    return(
                        <li key = {element.name} className={element.className}>
                            <NavLink to = {element.to} className={({isActive})=>{
                                if(element.name != 'Shopi'){
                                    return isActive ? activeStyle : undefined 
                                }
                                
                            }} onClick={()=>{
                                contexto_uwu.closeShoppingCart();
                                contexto_uwu.closeProductDetail()

                            }}>
                                {element.name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>

            <ul className="flex items-center gap-3 flex-wrap mt-2 justify-center lg:mt-0 lg:w-1/2 lg:justify-end">
                {menu2.map((element)=>{
                    if(element.name == contexto_uwu?.user[0]?.userName || element.name == 'Guest'){
                        return(
                            <li key = {element.name} className={`${element.className} basis-full grow-0 shrink-0 text-center lg:basis-auto`}>{element.name}</li>
                        )
                    }else if(element.name == 'Check Out'){
                        return(
                            <li key={element.name} className= 'cursor-pointer flex flex-row relative w-[85px]'onClick={()=>{
                                if(contexto_uwu.isCheckOutActive == true){
                                    contexto_uwu.setCheckOutActive(false)
                                }else{
                                    contexto_uwu.setCheckOutActive(true);
                                }
                            }}>{element.name} {contexto_uwu.checkOutProducts.length > 0 ? <span className='absolute w-3 text-xs text-red-500 font-semibold right-0 text-center top-2'>!</span> : ''}</li>
                        )
                    }else if(element.name == 'Carrito gei'){
                        return(
                            <li key = {element.name} className='flex row flex-wrap justify-between'> <ShoppingCartIcon onClick={()=>{

                                {contexto_uwu.isShoppingCartOpen ? contexto_uwu.closeShoppingCart() : contexto_uwu.openShoppingCart()}
                                contexto_uwu.setTryingToDelete(false)
                                
                            }}className='block h-6 w-8 text-black-500 cursor-pointer'/> {contexto_uwu.counter}</li>
                        )
                    }else{
                        return(
                            <li key = {element.name}>
                                <NavLink to={element.to} className={({ isActive })=>{
                                    return isActive ? activeStyle : undefined
                                }}>
                                    {element.name}
                                </NavLink>
                            </li>
                        )
                    }
                })}
            </ul>
        </nav>
    )
}

export {Navbar}