
import { Cards } from "../../Components/Cards"
import { Layout } from "../../Components/Layout"
import { useState, useEffect } from "react"




function Home(){
    const url = 'https://api.escuelajs.co/api/v1/products'

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
            <section className='flex w-full h-auto flex-wrap justify-around'>
                {items?.map((product)=>{
                        
                        return(<Cards itemID = {product?.id}key={product?.id} category={product?.category?.name} img={product?.images[0]} product={product?.title} price={product?.price}/>)
                    
                })}
            </section>
        </Layout>
    )
}

export {Home}