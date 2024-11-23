export async function getProductById(productId: string) {
    try{
        const response = await fetch(`http://localhost:5000/product/detail/${productId}`)
        const parsedResponse = await response.json();
        console.log("Response in productApi", parsedResponse)
        if(parsedResponse.error) {
            throw new Error(parsedResponse.error)
        }
        return parsedResponse;

    } catch (error){
        if(error instanceof Error) {
            return error.message
        }
        return "Something went wrong"
    }
}
