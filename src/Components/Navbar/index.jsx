import { NavLink } from "react-router-dom";

function Navbar(){

    const activeStyle = 'underline underline-offset-4';

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
            name: 'Carrito gei 0',
            className: ''
        }







    ]
    return(
        <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-base font-medium top-0">
            <ul className="flex items-center gap-3">
                {menu1.map((element)=>{
                    return(
                        <li key = {element.name} className={element.className}>
                            <NavLink to = {element.to} className={({isActive})=>{
                                if(element.name != 'Shopi'){
                                    return isActive ? activeStyle : undefined 
                                }
                                
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
                    }else if(element.name == 'Carrito gei 0'){
                        return(
                            <li key = {element.name}>{element.name}</li>
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