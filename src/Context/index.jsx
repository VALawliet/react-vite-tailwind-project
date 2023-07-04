import { createContext, useState } from "react";
import { useEffect } from "react";


const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}){
    
    const url = 'https://fakestoreapi.com/products'

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([])
    
    
    useEffect(()=>{

        setTimeout(()=>{
            const responseFetch = async ()=>{
                try{
                    const response = await fetch(url);
                    const responseJSON = await response.json();
                    const deepCopy = [...responseJSON];
                    const newItems = deepCopy.map((element)=>{
                        element.amount = 3;
                        return element
                    })
                    
    
                    
                    setItems(newItems);
                    
                }catch (err) {
                    console.log(err)
                }
    
            }
    
            responseFetch();

            try{
                const localStorageResponse = localStorage.getItem('USER');
                let parsedUser;

                if(!localStorageResponse){
                    localStorage.setItem('USER', '[]');
                    parsedUser = [];

                }else{
                    let jsonResponse = JSON.parse(localStorageResponse);
                    parsedUser = jsonResponse;
                    setUser(parsedUser)
                }

                setLoading(false)
            }catch(err){
                console.log(err)
            }
            
        }, 4000)
        

    }, [])

   
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
    const [isPassVisible, setPassVisible] = useState(false);
    const [isTryingToDeleteAcc, setTryingToDeleteAcc] = useState(false)
    const [userValue, setUserValue] = useState('');
    const [userPass, setUserPass] = useState('');
    

    //Adding products to the shopping cart for checkout 

    function productsLenghtEquals0OrNot(productsToAdd, data, copyItems){
        if(productsToAdd.length == 0){
            console.log('working 1');
            console.log(data);

            if(data.productAmount == 3){
                const lessAmount = data.productAmount - 2
                const newData = {
                    mainProduct: {
                        productName: data.productName,
                        productCategory: data.productCategory,
                        productImg: data.productImg,
                        productPrice: data.productPrice,
                        productDescription: data.productDescription,
                        productAmount: lessAmount
                    }
                }
                for(let product of copyItems){
                    if(product.title == data.productName){
                        product.amount = data.productAmount - 1
                    }
                }
                setProductToAdd([newData]);
                setItems(copyItems)
                setCounter(counter + 1);

            }else if(data.productAmount == 2){
                const lessAmount = data.productAmount - 1
                const newData = {
                    mainProduct: {
                        productName: data.productName,
                        productCategory: data.productCategory,
                        productImg: data.productImg,
                        productPrice: data.productPrice,
                        productDescription: data.productDescription,
                        productAmount: lessAmount
                    }
                }
                for(let product of copyItems){
                    if(product.title == data.productName){
                        product.amount = data.productAmount - 1
                    }
                }
                setProductToAdd([newData]);
                setItems(copyItems)
                setCounter(counter + 1);

            }else{
                const lessAmount = data.productAmount
                const newData = {
                    mainProduct: {
                        productName: data.productName,
                        productCategory: data.productCategory,
                        productImg: data.productImg,
                        productPrice: data.productPrice,
                        productDescription: data.productDescription,
                        productAmount: lessAmount
                    }
                }
                for(let product of copyItems){
                    if(product.title == data.productName){
                        product.amount = data.productAmount - 1
                    }
                }
                setProductToAdd([newData]);
                setItems(copyItems)
                setCounter(counter + 1);
            }
            

        }else{
            console.log('else')
            const firstFilter = productsToAdd.filter((element)=>{
                return element.mainProduct.productName == data.productName;
            })
            console.log('seeing products to add')
            console.log(productsToAdd)
            
            console.log(firstFilter)
            if(firstFilter.length > 0){
                console.log('found')
                for(let product of productsToAdd){
                    if(product.mainProduct.productName == data.productName){
                        product.mainProduct.productAmount = product.mainProduct.productAmount + 1;

                        for(let item of copyItems){
                            if(item.title == data.productName){
                                console.log('item found')
                                item.amount = item.amount - 1;
                            }
                        }
                    }
                }

                setProductToAdd(productsToAdd);
                setItems(copyItems);
                setCounter(counter + 1)


            }else{
                console.log('not there');
                if(data.productAmount == 3){
                    const lessAmount = data.productAmount - 2
                    const newData = {
                        mainProduct: {
                            productName: data.productName,
                            productCategory: data.productCategory,
                            productImg: data.productImg,
                            productPrice: data.productPrice,
                            productDescription: data.productDescription,
                            productAmount: lessAmount
                        }
                    }

                    productsToAdd.push(newData);

                    for(let product of copyItems){
                        if(product.title == data.productName){
                            product.amount = data.productAmount - 1
                        }
                    }

                    setProductToAdd(productsToAdd);
                    setItems(copyItems);
                    setCounter(counter + 1)

                }else if(data.productAmount == 2){
                    const lessAmount = data.productAmount - 1
                    const newData = {
                        mainProduct: {
                            productName: data.productName,
                            productCategory: data.productCategory,
                            productImg: data.productImg,
                            productPrice: data.productPrice,
                            productDescription: data.productDescription,
                            productAmount: lessAmount
                        }
                    }

                    productsToAdd.push(newData);

                    for(let product of copyItems){
                        if(product.title == data.productName){
                            product.amount = data.productAmount - 1
                        }
                    }

                    setProductToAdd(productsToAdd);
                    setItems(copyItems);
                    setCounter(counter + 1)

                }else{
                    const lessAmount = data.productAmount
                    const newData = {
                        mainProduct: {
                            productName: data.productName,
                            productCategory: data.productCategory,
                            productImg: data.productImg,
                            productPrice: data.productPrice,
                            productDescription: data.productDescription,
                            productAmount: lessAmount
                        }
                    }

                    productsToAdd.push(newData);

                    for(let product of copyItems){
                        if(product.title == data.productName){
                            product.amount = data.productAmount - 1
                        }
                    }

                    setProductToAdd(productsToAdd);
                    setItems(copyItems);
                    setCounter(counter + 1)
                }
                
                


                
            }
        }
    }

    function isSomethingInCheckOut(productsToAdd, data, copyCheckOut, copyItems){

        const valueInCheckOut = copyCheckOut.filter((element)=>{
            return element?.mainProduct?.productName == data.productName
        })

        if(valueInCheckOut.length > 0){
            for(let productInCheckOut of copyCheckOut){
                if(productInCheckOut.mainProduct.productName == data.productName){
                    if(productInCheckOut.mainProduct.productAmount == 2){
                        
                        
        
                        const newData = {
                            mainProduct:{
                                productName: data.productName,
                                productCategory: data.productCategory,
                                productPrice: data.productPrice,
                                productImg: data.productImg,
                                productDescription: data.productDescription,
                                productAmount: 2 - data.productAmount
                            }
                        }
        
                        for(let product of copyItems){
                            if(product.title == data.productName){
                                product.amount = data.productAmount - 1
                            }
                        }
        
                        productsToAdd.push(newData);
        
                        setProductToAdd(productsToAdd);
                        setItems(copyItems);
                        setCounter(counter + 1);
                        
                    
                    }else{
                        console.log('error en else')
                        const newData = {
                            mainProduct:{
                                productName: data.productName,
                                productCategory: data.productCategory,
                                productPrice: data.productPrice,
                                productImg: data.productImg,
                                productDescription: data.productDescription,
                                productAmount: data.productAmount - 1
                            }
                        }
        
                        for(let product of copyItems){
                            if(product.title == data.productName){
                                product.amount = data.productAmount - 1
                            }
                        }
        
                        const valueIsInList = productsToAdd.filter((element)=>{
                            return element.mainProduct.productName == data.productName;
                        });
        
                        if(valueIsInList.length == 0){
                            console.log('not in for')
        
                            productsToAdd.push(newData)
        
                        }else{
                            console.log('entering for')
                            for(let product of productsToAdd){
                                if(product.mainProduct.productName == data.productName){
                                    console.log(product.mainProduct.productAmount);
                                    console.log(data.productAmount);
        
                                    if(newData.mainProduct.productAmount == 0){
                                        product.mainProduct.productAmount = newData.mainProduct.productAmount + 2
                                    }else{
                                        product.mainProduct.productAmount = newData.mainProduct.productAmount
                                    }
        
                                    
                                }
                            }
                        }
        
                        setProductToAdd(productsToAdd);
                        setItems(copyItems);
                        setCounter(counter + 1);
                        
                    }
    
                }
                
            }

        }else{
            if(productsToAdd.length == 0){
                console.log('seeing data')
                console.log(data)
    
                if(data.productAmount == 3){
                    const lessAmount = data.productAmount - 2;
                    const newData = {
                        mainProduct: {
                            productName: data.productName,
                            productImg: data.productImg,
                            productCategory: data.productCategory,
                            productDescription: data.productDescription,
                            productPrice: data.productPrice,
                            productAmount: lessAmount
                        }
                    }
                    
                    for(let item of copyItems){
                        if(item.title == data.productName){
                            item.amount = data.productAmount - 1
                        }
                    }
                    setProductToAdd([newData]);
                    setItems(copyItems)
                    setCounter(counter + 1)
                }
    
            }else{
                const filter1 = productsToAdd.filter((element)=>{
                    return element.mainProduct.productName == data.productName
                })
    
                if(filter1.length > 0){
                    for(let product of productsToAdd){
                        if(product.mainProduct.productName == data.productName){
                            if(data.productAmount == 2){
                                
                                const newData = {
                                    mainProduct: {
                                        productName: data.productName,
                                        productImg: data.productImg,
                                        productCategory: data.productCategory,
                                        productDescription: data.productDescription,
                                        productPrice: data.productPrice,
                                        productAmount: data.productAmount
    
                                    }
                                }

                                product.mainProduct = newData.mainProduct;
                                setProductToAdd(productsToAdd)
    
                                
    
                            }else if(data.productAmount == 1){
                                const newData = {
                                    mainProduct: {
                                        productName: data.productName,
                                        productImg: data.productImg,
                                        productCategory: data.productCategory,
                                        productDescription: data.productDescription,
                                        productPrice: data.productPrice,
                                        productAmount: data.productAmount + 2
    
                                    }
                                }

                                product.mainProduct = newData.mainProduct
    
                                setProductToAdd(productsToAdd)
                            }
                        }
                    }
    
                    for(let item of copyItems){
                        if(item.title == data.productName){
                            item.amount = item.amount - 1
                        }
                    }
    
                    setItems(copyItems);
                    setCounter(counter + 1)
    
                }else{
                    const newData = {
                        mainProduct: {
                            productName: data.productName,
                                productImg: data.productImg,
                                productCategory: data.productCategory,
                                productDescription: data.productDescription,
                                productPrice: data.productPrice,
                                productAmount: data.productAmount - 2
                        }
                    }
    
                    productsToAdd.push(newData);
    
                    for(let item of copyItems){
                        if(item.title == data.productName){
                            item.amount = item.amount - 1
                        }
                    }
    
    
    
                    setProductToAdd(productsToAdd);
                    setItems(copyItems);
                    setCounter(counter + 1)
                    
                
                }
            }
        }

       

        

    }

    function addingProduct(data){
        const productsToAdd = [...productToAdd];
        const copyCheckOut = [...checkOutProducts];
        const copyFinalProducts = [...finalList];
        const copyItems = [...items]

        
            if(copyCheckOut.length != 0){
                console.log('something is in checkOut')
                isSomethingInCheckOut(productsToAdd, data, copyCheckOut, copyItems)

            }else{
                
                productsLenghtEquals0OrNot(productsToAdd, data, copyItems);
            }
        
        
        
        
        
        
    }

    function deletingProduct(data){
        const deleteThisProduct = [...productToAdd];
        const newItems1 = [...items]
        
        const deletingAmount = deleteThisProduct.map((element)=>{
            if(element?.mainProduct?.productName == data.productName){

                if(element.mainProduct.productAmount >= 2){
                    element.mainProduct.productAmount = element.mainProduct.productAmount - 1;
                    return element
                }else{
                    element.mainProduct.Amount = element.mainProduct.productAmount - 1
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
        const productsToAdd = [...productToAdd]
        
        for(let product of productsToAdd){
            for(let item of returningBackToNormal){
                if(product.mainProduct.productName == item.title){
                    item.amount = item.amount + product.mainProduct.productAmount
                }
            }
        }

        setItems(returningBackToNormal);
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
                return (element.mainProduct?.productPrice * element?.mainProduct.productAmount)
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
            const actualCheckOutList = [...checkOutProducts];
            const copyItems = [...items];
            const copyProductsToAdd = [...productToAdd];

            for(let product of actualCheckOutList){
                for(let item of copyItems){
                    if(item.title == product.mainProduct.productName){
                        item.amount = item.amount + product.mainProduct.productAmount;
                    }
                }
            }

            const newPriceList = copyProductsToAdd.map((element)=>{
                return (element.mainProduct?.productPrice * element?.mainProduct.productAmount)
            })

            const priceSum = newPriceList.reduce((accumulator, currentvalue)=> accumulator + currentvalue, 0);
            setCheckOutSum(parseFloat(priceSum.toFixed(2)))
            setItems(copyItems);
            setCounter(0)
            setCheckOutProducts(copyProductsToAdd);
            setProductToAdd([])
        }
           
        
    }

    function deletingOneFromCheckOut(data){
        const copyAllCheckOut = [...checkOutProducts];
        const copyAllItems = [...items];

        for(let product of copyAllCheckOut){

            if(product?.mainProduct.productAmount >= 1){
                if(product?.mainProduct?.productName == data.productName){
                    product.mainProduct.productAmount = product.mainProduct.productAmount - 1
                }
            }
            
        }

        const modifier = copyAllCheckOut.filter((element)=>{
            return element.mainProduct.productAmount > 0
        })

        for(let item of copyAllItems){
            if(item?.title == data.productName){
                if(item?.amount < 3){
                    item.amount = item.amount + 1
                }
            }
        }

        const priceList = modifier.map((element)=>{
            return element?.mainProduct?.productPrice * element?.mainProduct.productAmount
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
                    item.amount = item.amount + product.mainProduct.productAmount;
                }
            }
        }

        setItems(copyOfItems);
        setCheckOutProducts([]);
        
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
                        item.amount = item.amount + product.mainProduct.productAmount
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
            cancelingOrder,
            loading,
            user,
            setUser,
            isPassVisible,
            setPassVisible,
            userValue,
            setUserValue,
            userPass,
            setUserPass,
            isTryingToDeleteAcc,
            setTryingToDeleteAcc
        }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )
}

export {ShoppingCartProvider}
export {ShoppingCartContext}