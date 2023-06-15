import { createContext, useState } from "react";

const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}){
    
    const [counter, setCounter] = useState(0);
    
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