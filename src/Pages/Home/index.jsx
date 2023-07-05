
import { Cards } from "../../Components/Cards"
import { Cart } from "../../Components/Cart"
import { CheckOutView } from "../../Components/CheckOutView"
import { Layout } from "../../Components/Layout"
import { ProductDetail } from "../../Components/Productdetail"
import { ShoppingCartContext } from "../../Context"
import { useContext } from "react"




function Home(){
    const context = useContext(ShoppingCartContext)
    const deepCopy1 = [...context.items]

    

    
    
    
    return(
        <Layout>
            
            <section className='flex w-9/12 h-auto flex-wrap justify-around'>
                {deepCopy1?.map((product)=>{
                        
                        return(<Cards itemID = {product?.id}key={product?.id} category={product?.category == 'jewelery' ? 'jewelry' : product?.category} img={product?.image} product={product?.title} price={product?.price} description = {product?.description} amount = {product?.amount} deepCopy = {deepCopy1}/>)
                    
                })}

                <ProductDetail/>
                <Cart/>
            </section>

            {context.isCheckOutActive ? <CheckOutView/> : <div></div>}

            
        </Layout>
    )
}

export {Home}