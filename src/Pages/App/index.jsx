import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
import './App.css'
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

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes/>
        <Navbar/> 
      
      </BrowserRouter>
    </ShoppingCartProvider>
    
  )
}

export default App
