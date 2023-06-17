
import { Cards } from "../../Components/Cards"
import { Layout } from "../../Components/Layout"
import { ProductDetail } from "../../Components/Productdetail"
import { useState, useEffect } from "react"




function Home(){
    const url = 'https://fakestoreapi.com/products'

    const [items, setItems] = useState([])
    
    useEffect(()=>{
        const responseFetch = async ()=>{
            try{
                const response = await fetch(url);
                const responseJSON = await response.json();
                setItems(responseJSON);
                console.log(items)
            }catch (err) {
                console.log(err)
            }

        }

        responseFetch()
    }, [])
    
    
    return(
        <Layout>
            Home
            <section className='flex w-4/6 h-auto flex-wrap justify-around'>
                {items?.map((product)=>{
                        
                        return(<Cards itemID = {product?.id}key={product?.id} category={product?.category} img={product?.image} product={product?.title} price={product?.price} description = {product?.description}/>)
                    
                })}

                <ProductDetail/>
            </section>

            
        </Layout>
    )
}

export {Home}