import { LoadingContextReader } from '../LoadingContextReader'
import { ShoppingCartProvider } from '../../Context'
import './App.css'


function App() {
  return (
    <ShoppingCartProvider>
      <LoadingContextReader/>
    </ShoppingCartProvider>
    
  )
}

export default App
