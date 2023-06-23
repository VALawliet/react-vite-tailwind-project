import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

function Navbar(){

    const activeStyle = 'underline underline-offset-4';
    const contexto_uwu = useContext(ShoppingCartContext)

    const menu1 = [
        {
            to: "/",
            name: 'Shopi',
            className: 'font-semibold text-lg'
        },

        {
            to: '/all',
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
            to: '/furnitures',
            name: 'Furnitures',
            className: ''
        },
        {
            to: '/toys',
            name: 'Toys',
            className: ''
        },
        {
            to: '/others',
            name: 'Others',
            className: ''
        }
    ]

    const menu2 = [

        {
            name: 'uwu@gmail.com',
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
            to: '/SignIn',
            name: 'Sign In',
            className: ''
        },

        {
            name: 'Carrito gei',
            icon: ShoppingCartIcon,
            className: ''
        }







    ]
    return(
        <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-base font-medium top-0 bg-white">
            <ul className="flex items-center gap-3">
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

            <ul className="flex items-center gap-3">
                {menu2.map((element)=>{
                    if(element.name == 'uwu@gmail.com'){
                        return(
                            <li key = {element.name}className={element.className}>{element.name}</li>
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