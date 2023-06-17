import { createContext, useState } from "react";

const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}){
    
   
    const [isProductDetailOpen, setProductDetailOpen] = useState(false);
    const [productToShow, setProductToShow] = useState({});
    const [productToAdd, setProductToAdd] = useState([]);
    

    //Adding products to the shopping cart for checkout 
    function addingProduct(data){
        const productsToAdd = [...productToAdd];
        productsToAdd.push(data);
        console.log(productsToAdd);
        setProductToAdd(productsToAdd);
    }

    function deletingProduct(data){
        const deleteThisProduct = [...productToAdd];
        const productDelete = deleteThisProduct.filter((element)=>{
            return element.productName != data.productName
        })
        
        console.log(productDelete)
        setProductToAdd(productDelete)
    }
    //Product Detail showing products
    const openProductDetail = ()=>{
        setProductDetailOpen(true);
    }

    const closeProductDetail = ()=>{
        setProductDetailOpen(false);
    }
    
    return(
        <ShoppingCartContext.Provider value={{
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            productToAdd,
            addingProduct,
            deletingProduct
        }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )
}

export {ShoppingCartProvider}
export {ShoppingCartContext}