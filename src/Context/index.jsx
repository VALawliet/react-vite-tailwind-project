import { createContext, useState } from "react";

const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}){
    
    const [counter, setCounter] = useState(0);
    console.log('pasen contexto. El contexto es ' + counter)
    return(
        <ShoppingCartContext.Provider value={{
            counter, 
            setCounter
        }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )
}

export {ShoppingCartProvider}
export {ShoppingCartContext}