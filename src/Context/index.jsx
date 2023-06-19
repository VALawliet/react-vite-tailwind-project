import { createContext, useState } from "react";
import { useEffect } from "react";

const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}){
    
    const url = 'https://fakestoreapi.com/products'

    const [items, setItems] = useState([]);
    
    
    useEffect(()=>{
        const responseFetch = async ()=>{
            try{
                const response = await fetch(url);
                const responseJSON = await response.json();
                const deepCopy = [...responseJSON];
                const newItems = deepCopy.map((element)=>{
                    element.amount = 3;
                    return element
                })
                console.log(newItems)
                setItems(newItems);
                
            }catch (err) {
                console.log(err)
            }

        }

        responseFetch();
        

    }, [])
    console.log(items)
    const [isProductDetailOpen, setProductDetailOpen] = useState(false);
    const [isShoppingCartOpen, setShoppingCartOpen] = useState(false)
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
        const newItems1 = [...items]
        
        const deletingAmount = deleteThisProduct.map((element)=>{
            if(element?.mainProduct?.productName == data.productName){

                if(element.amount >= 2){
                    element.amount = element.amount - 1;
                    return element
                }else{
                    element.amount = element.amount - 1
                    return {...element, valueDetect: true}
                }
            }else{
                return element
            }
            
        })
        console.log('seeing the thing itself')
        console.log(deletingAmount)



        const deletingWholeProduct = deletingAmount.filter((element)=>{
            return element?.valueDetect != true
        })
        console.log('working?')

        if(deleteThisProduct.length > 0){
            
            const newItems2 = newItems1.map((element)=>{
                if(element?.title == data.productName){
                    if(element.amount < 3){
                        element.amount = element.amount + 1;
                        return element
                    }else{
                        return element
                    }
                    
                }else{
                    return element
                }
            })

            const itemToDeleteIndex = newItems2.findIndex((element)=>{
                return element?.title == data.productName
            })

            if(newItems2[itemToDeleteIndex].amount <= 3){
                setCounter(counter - 1)
            }
            console.log('new Items')
            console.log(newItems2)
            
            setItems(newItems2)
        }
        
        setProductToAdd(deletingWholeProduct)
        
        
        
    }
    //Product Detail showing products
    const openProductDetail = ()=>{
        setProductDetailOpen(true);
        setShoppingCartOpen(false)
    }

    const closeProductDetail = ()=>{
        setProductDetailOpen(false);
    }

    //Shopping Cart Opening and closing

    const openShoppingCart = () =>{
        setShoppingCartOpen(true);
        setProductDetailOpen(false)
    }

    const closeShoppingCart = ()=>{
        setShoppingCartOpen(false)
    }
    
    return(
        <ShoppingCartContext.Provider value={{
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            isShoppingCartOpen,
            openShoppingCart,
            closeShoppingCart,
            productToShow,
            setProductToShow,
            productToAdd,
            addingProduct,
            deletingProduct,
            counter, 
            setCounter,
            setItems, 
            items
        }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )
}

export {ShoppingCartProvider}
export {ShoppingCartContext}