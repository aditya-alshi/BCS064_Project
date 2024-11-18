import { Form } from "react-router-dom"

export async function action ({ request }: { request: Request }){
    const formdata = await request.formData();
    Array.from(formdata.entries()).forEach(([key, value]) => {
        console.log(key, value)
    })
    return formdata.get('productName')
}

export default function SubmitProduct() {
    return (
        <section className="w-full flex justify-center items-center ">
            <Form method="post">
                <p>
                    <label htmlFor="productName">
                        <span>Product Name: </span>
                        <input required className="border" type="text" name="productName" id="productName" />    
                    </label>
                </p>
                <p>
                    <label htmlFor="productDescription">
                        <span>Product Description: </span>
                        <textarea required className="border" name="productDescription" id="productDescription" ></textarea>    
                    </label>
                </p>
                <p>
                    <label htmlFor="productImage">
                        <span>Product Image: </span>
                        <input required className="border" type="file" name="productImage" id="productImage" />    
                    </label>
                </p>
                <p>
                    <label htmlFor="category">
                        <span>Product category: </span>
                    </label>
                    <select required name="category" id="category">
                        <option value="">Choose a Category</option>
                        
                        <optgroup label="Sweets">
                            <option value="ladoo">Ladoo</option>
                            <option value="burfi">Burfi</option>
                            <option value="pak">Pak</option>
                        </optgroup>
                        
                        <optgroup label="Savories">
                            <option value="khakra">Khakra</option>
                            <option value="murukku">Murukku</option>
                            <option value="sev">Sev</option>
                        </optgroup>

                    </select>
                </p>
                <p className="mt-4">
                    <button className=" active:outline-2 hover:scale-x-[1.025] py-1 w-full bg-lighterAccent text-white " type="submit">Submit</button>
                </p>
            </Form>
        </section>
    )
}