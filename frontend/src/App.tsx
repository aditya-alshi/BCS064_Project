import Footer from './lib/components/sections/Footer'
import Header from './lib/components/sections/Header/Header'
import Products from './lib/components/sections/products'
import Filter from './lib/components/sections/Filters'
import Pagination from './lib/components/buttons/Pagination'
export default function App() {
    return(
        <div className='font-sans flex flex-col w-full bg-background border'>
            <Header />
            <section className='flex my-2 mx-10 m-auto border' >
                {/* <Filter /> */}
                <Products />
            </section>
            <Pagination />
            <Footer />
        </div>
    )
}