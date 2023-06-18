import { createContext, useState } from "react";

const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}){
    
   
    const [isProductDetailOpen, setProductDetailOpen] = useState(false);
    const [counter, setCounter] = useState(0)
    const [productToShow, setProductToShow] = useState({});
    const [productToAdd, setProductToAdd] = useState([]);
    

    //Adding products to the shopping cart for checkout 
    function addingProduct(data){
        const productsToAdd = [...productToAdd];
        

        if(productsToAdd.length == 0){
            console.log('pushing')
            productsToAdd.push(data);
            console.log(productsToAdd)
            
            setProductToAdd(productsToAdd)
        }else{
            const modifier = productsToAdd.map((element)=>{
                
                if(data.mainProduct.productName == element?.mainProduct?.productName){
                    console.log('enter')
                    element.amount = data.amount;
                    return element
                }else{
                    return element
                }
                
            })

            const filtro = modifier.filter((element)=>{
                if(element?.mainProduct?.productName == data.mainProduct.productName){
                    return element
                }
            })

            if(filtro.length == 0){
                console.log('filtro')
                productsToAdd.push(data);
                console.log(productsToAdd)
                setProductToAdd(productsToAdd)
            }else{
                console.log('trying to add the modifier')
                console.log(modifier)
                setProductToAdd(modifier);
            }

            
            
            
            
            
            
        }
        
        
        
        
        
    }

    function deletingProduct(data){
        const deleteThisProduct = [...productToAdd];
        const productDelete = deleteThisProduct.filter((element)=>{
            return element?.mainProduct?.productName != data.productName
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
            deletingProduct,
            counter, 
            setCounter
        }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )
}

export {ShoppingCartProvider}
export {ShoppingCartContext}