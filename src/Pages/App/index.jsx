import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
import './App.css'
import { Home } from '../Home'
import { MyAccount } from '../MyAccount'
import { MyOrder } from '../MyOrder'
import { MyOrders} from '../MyOrders'
import { NotFound } from '../NotFound'
import { SignIn } from '../SignIn'
import { Navbar } from '../../Components/Navbar'



const AppRoutes = ()=>{
  let routes = useRoutes([
    { path: '/', element: <Home/> },
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
