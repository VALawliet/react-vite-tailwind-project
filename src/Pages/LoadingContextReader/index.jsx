import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { Home } from '../Home'
import { Clothes } from '../Clothes'
import { MyAccount } from '../MyAccount'
import { MyOrder } from '../MyOrder'
import { MyOrders} from '../MyOrders'
import { NotFound } from '../NotFound'
import { SignIn } from '../SignIn'
import { Navbar } from '../../Components/Navbar'
import { Jewelry } from '../Jewelry'
import { Electronics } from '../Electronics'

const AppRoutes = ()=>{
    let routes = useRoutes([
      { path: '/Home', element: <Home/> },
      { path: '/clothes', element: <Clothes/>},
      { path: '/jewelry', element: <Jewelry/>},
      { path: '/electronics', element: <Electronics/>},
      { path: '/MyAccount', element: <MyAccount/> },
      { path: '/MyOrders', element: <MyOrders/> },
      { path: '/MyOrder', element: <MyOrder/> },
      { path: '/*', element: <NotFound/> },
      { path: '/SignIn', element: <SignIn/> }
    ])
  
    return routes
}


function LoadingContextReader(){
    const context = useContext(ShoppingCartContext);

    return(
        <>
            {context.loading ? 
            <div>
                alo
            </div> 
            
        
            
            :
            
            <BrowserRouter>
                <AppRoutes/>
                <Navbar/> 
      
            </BrowserRouter>
            
            }
        </>
    )
}

export { LoadingContextReader }