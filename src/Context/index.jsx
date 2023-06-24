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
    const [checkOutProducts, setCheckOutProducts] = useState([]);
    const [checkOutSum, setCheckOutSum] = useState(0);
    const [totalPriceList, setTotalPriceList] = useState([])
    const [isActive, setActive] = useState(false);
    const [isCheckOutActive, setCheckOutActive] = useState(false)
    const [isTryingToDelete, setTryingToDelete] = useState(false);
    const [allDeleted, setAllDeleted] = useState(false);
    const [finalList, setFinalList] = useState([]);
    

    //Adding products to the shopping cart for checkout 
    function addingProduct(data){
        const productsToAdd = [...productToAdd];
        const copyCheckOut = [...checkOutProducts];
        let newData = data
        

        if(productsToAdd.length == 0){

            if(copyCheckOut.length > 0){
                for(let element of copyCheckOut){
                    if(element.mainProduct.productName == newData.mainProduct.productName){
                        if(newData.amount == 3){
                            if(element.amount == 2){
                                newData.amount = element.amount - 1
                            }else{
                                newData.amount = newData.amount - 1
                            }
                            
                        }
                        else if(newData.amount == 2){
                            console.log('entrando acá 1')
                            newData.amount = newData.amount - 1
                        }else if(newData.amount == 1){
                            console.log('entrando acá')
                            newData.amount = 1
                        }
                        
                    }
                }
                console.log('pushing after loop')
                productsToAdd.push(newData);
                setProductToAdd(productsToAdd);
            }else{
                console.log('pushing')
                productsToAdd.push(newData);
                console.log(productsToAdd)
            
                setProductToAdd(productsToAdd)
            }
            
            
        }else{
            const newData = data;
            const modifier = productsToAdd.map((element)=>{
                
                if(data.mainProduct.productName == element?.mainProduct?.productName){
                    for(let checkOutElement of copyCheckOut){
                        if(element.mainProduct.productName == checkOutElement?.mainProduct?.productName){
                            if(newData.amount == 3){
                                newData.amount = newData.amount - 1;
                            }else if(newData.amount == 2){
                                newData.amount = newData.amount - 1
                            }else{
                                newData.amount = 1
                            }
                        }
                    }
                    console.log('enter')
                    element.amount = newData.amount;
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

    function deletingAllProducts(){
        const returningBackToNormal = [...items];
        const backToOriginalAmounts = returningBackToNormal.map((element)=>{
            if(element.amount <= 3){
                element.amount = 3;
                return element
            }else{
                return element
            }
        })

        setItems(backToOriginalAmounts);
        setCounter(0);
        setProductToAdd([])

        
    }

    function disablingAllButtons(){
        const buttons = document.querySelectorAll('.but');

        for(let button of buttons){
            if(button.hasAttribute('disabled')){
                button.removeAttribute('disabled')
            }else{
                button.setAttribute('disabled', '')
            }
        }
    }

    function addingProductsToCheckOut(){

        if(checkOutProducts.length == 0){
            const newCheckOutProducts = [...productToAdd];
            const newPriceList = newCheckOutProducts.map((element)=>{
                return (element.mainProduct?.productPrice * element?.amount)
               })
            
            const sumOfAllPrices = newPriceList.reduce((accumulator, currentvalue) => accumulator + currentvalue, 0);
            console.log(sumOfAllPrices)
            setCheckOutSum(parseFloat(sumOfAllPrices.toFixed(2)));
               
            setTotalPriceList([...totalPriceList, parseFloat(sumOfAllPrices.toFixed(2))]);
            console.log(newCheckOutProducts)
            setCheckOutProducts(newCheckOutProducts);
            setProductToAdd([]);
            setCounter(0)
            
        }else{
            const actualCheckOutProducts = [...checkOutProducts];
            const copyItems = [...items];
            const newCheckOutProducts = [...productToAdd]

            for(let product of actualCheckOutProducts){
                for(let item of copyItems){
                    if(product?.mainProduct?.productName == item?.title){
                        if(item.amount != 0){
                            item.amount = item.amount + product.amount;
                        }
                        
                    }else{
                        continue
                    }
                }
            }

            for(let product of actualCheckOutProducts){
                
                for(let productAdding of newCheckOutProducts){
                    
                    if(product?.mainProduct?.productName != productAdding?.mainProduct?.productName){
                        
                        for(let item of copyItems){
                            if(item?.title == product?.mainProduct?.productName){
                                item.amount = 3;
                            }else{
                                continue
                            }
                        }
                    }else{
                        
                        for(let item of copyItems){
                            if(item?.title == productAdding?.mainProduct?.productName){
                                if(item.amount != 0){
                                    console.log('cantidades')
                                    console.log(item.amount);
                                    console.log(productAdding.amount)
                                    item.amount = (item.amount + 1) - productAdding.amount
                                }else{
                                    console.log('cantidades si es cero');
                                    console.log(item.amount);
                                    item.amount = 3 - productAdding.amount;
                                    console.log(item.amount)
                                }
                                
                            }
                        }
                    }
                }
            }

            const priceList = newCheckOutProducts.map((element)=>{
                return(element.mainProduct?.productPrice * element?.amount)
            })

            const sumPrices = priceList.reduce((accumulator, currentvalue) => accumulator + currentvalue, 0);
            setCheckOutSum(sumPrices)
            setCheckOutProducts(newCheckOutProducts);
            setProductToAdd([]);
            console.log('changing list')
            console.log(copyItems)
            setItems(copyItems);
            setCounter(0);
            
        }
           
        
    }

    function deletingOneFromCheckOut(data){
        const copyAllCheckOut = [...checkOutProducts];
        const copyAllItems = [...items];

        for(let product of copyAllCheckOut){

            if(product?.amount >= 1){
                if(product?.mainProduct?.productName == data.productName){
                    product.amount = product.amount - 1
                }
            }
            
        }

        const modifier = copyAllCheckOut.filter((element)=>{
            return element.amount > 0
        })

        for(let item of copyAllItems){
            if(item?.title == data.productName){
                if(item?.amount < 3){
                    item.amount = item.amount + 1
                }
            }
        }

        const priceList = modifier.map((element)=>{
            return element?.mainProduct?.productPrice * element?.amount
        });

        const sumOfProducts = priceList.reduce((accumulator, currentvalue)=> accumulator + currentvalue, 0);
        console.log('lista de precios')
        console.log(priceList);
        console.log(sumOfProducts)
        setCheckOutSum(parseFloat(sumOfProducts.toFixed(2)));
        setItems(copyAllItems);
        setCheckOutProducts(modifier);


    }

    function deletingFromCheckOut(){
        const copyCheckOut = [...checkOutProducts];
        const copyOfItems = [...items];

        for(let product of copyCheckOut){
            for(let item of copyOfItems){
                if(product?.mainProduct?.productName == item?.title){
                    item.amount = 3;
                }
            }
        }

        setItems(copyOfItems);
        setCheckOutProducts([]);
        setCounter(0);
        setCheckOutSum(0);
        console.log('Deleted')
    }

    function addingToFinalList(data){
        const copyFinal = [...finalList];
        copyFinal.push(data);
        console.log('adding')
        console.log(copyFinal)
        setFinalList(copyFinal)
        setCheckOutProducts([]);
        setCheckOutActive(false)
        
    }

    function cancelingOrder(index){
        const copyFinal = [...finalList];
        const copyItems = [...items];
        const priceListCopy = [...totalPriceList]
        
        console.log(index)
        console.log(copyFinal[index]);

        for(let product of copyFinal[index]){

            for(let item of copyItems){

                if(product?.mainProduct?.productName == item?.title){
                    if(item.amount < 3){
                        item.amount = item.amount + product.amount
                    }
                }
            }
        }

        copyFinal.splice(index, 1);
        priceListCopy.splice(index, 1)
        

        setFinalList(copyFinal);
        setItems(copyItems);
        setTotalPriceList(priceListCopy)

        
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
            items,
            isActive,
            setActive,
            deletingAllProducts,
            isTryingToDelete, 
            setTryingToDelete,
            allDeleted,
            setAllDeleted,
            disablingAllButtons,
            checkOutProducts,
            setCheckOutProducts,
            addingProductsToCheckOut,
            checkOutSum,
            totalPriceList,
            isCheckOutActive,
            setCheckOutActive,
            deletingFromCheckOut,
            deletingOneFromCheckOut,
            addingToFinalList,
            finalList,
            setFinalList,
            cancelingOrder
        }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )
}

export {ShoppingCartProvider}
export {ShoppingCartContext}