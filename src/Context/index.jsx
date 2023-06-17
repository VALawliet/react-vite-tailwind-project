import { createContext, useState } from "react";

const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}){
    
    const [counter, setCounter] = useState(0);
    const [isProductDetailOpen, setProductDetailOpen] = useState(false);
    const [productToShow, setProductToShow] = useState({});

    //Product Detail showing products
    const openProductDetail = ()=>{
        setProductDetailOpen(true);
    }

    const closeProductDetail = ()=>{
        setProductDetailOpen(false);
    }
    
    return(
        <ShoppingCartContext.Provider value={{
            counter, 
            setCounter,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow
        }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )
}

export {ShoppingCartProvider}
export {ShoppingCartContext}