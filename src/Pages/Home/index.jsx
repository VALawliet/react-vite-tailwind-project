
import { Cards } from "../../Components/Cards"
import { Layout } from "../../Components/Layout"
import { ProductDetail } from "../../Components/Productdetail"
import { ShoppingCartContext } from "../../Context"
import { useContext } from "react"




function Home(){
    const context = useContext(ShoppingCartContext)
    const deepCopy1 = [...context.items]

    

    
    
    
    return(
        <Layout>
            Home
            <section className='flex w-4/6 h-auto flex-wrap justify-around'>
                {deepCopy1?.map((product)=>{
                        
                        return(<Cards itemID = {product?.id}key={product?.id} category={product?.category} img={product?.image} product={product?.title} price={product?.price} description = {product?.description} amount = {product?.amount} deepCopy = {deepCopy1}/>)
                    
                })}

                <ProductDetail/>
            </section>

            
        </Layout>
    )
}

export {Home}