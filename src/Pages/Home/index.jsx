
import { Cards } from "../../Components/Cards"
import { Layout } from "../../Components/Layout"
import { ProductDetail } from "../../Components/Productdetail"
import { useState, useEffect } from "react"




function Home(){
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
    const deepCopy1 = [...items]

    

    
    
    
    return(
        <Layout>
            Home
            <section className='flex w-4/6 h-auto flex-wrap justify-around'>
                {deepCopy1?.map((product)=>{
                        
                        return(<Cards itemID = {product?.id}key={product?.id} category={product?.category} img={product?.image} product={product?.title} price={product?.price} description = {product?.description} amount = {product?.amount} setItems = {setItems} deepCopy = {deepCopy1}/>)
                    
                })}

                <ProductDetail/>
            </section>

            
        </Layout>
    )
}

export {Home}