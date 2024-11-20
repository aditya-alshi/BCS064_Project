import { Form, useActionData } from "react-router-dom"

export async function action ({ request }: { request: Request }){
    const formdata = await request.formData();
    const jwtToken = JSON.parse(localStorage.getItem("jwtToken") || "");
    let formOBject: Record<string, FormDataEntryValue> = {};
    Array.from(formdata.entries()).forEach(([key, value]) => {
        formOBject[key] = value;
    })

    const body = JSON.stringify({...formOBject})
    const response = await fetch("http://localhost:5000/seller/addNewProduct",{
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        body: formdata,
    })
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    return{ parsedResponse}
}

export default function SubmitProduct() {

    const actionData = useActionData() as {
        parsedResponse: {
          message?: string;
          error?: string;
        };
        statusCode: number;
      };

    return (
        <section className="w-full flex justify-center items-center ">
           {/* { actionData ? actionData.parsedResponse.message || actionData.parsedResponse.error: "" } */}
            <Form method="post" encType='multipart/form-data'>
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
                <p>
                    <label htmlFor="stock">
                        <span>Stock </span>
                        <input required className="border" type="number" name="stock" id="stock" />    
                    </label>
                </p>
                <p className="mt-4">
                    <button className=" active:outline-2 hover:scale-x-[1.025] py-1 w-full bg-lighterAccent text-white " type="submit">Submit</button>
                </p>
            </Form>
        </section>
    )
}