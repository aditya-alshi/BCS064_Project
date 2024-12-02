export async function getProductById(productId: string) {
    try{
        const response = await fetch(`http://13.234.75.74:3000/product/detail/${productId}`)
        const parsedResponse = await response.json();
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

export async function getAllProducts(pageNo: number) {
    try{

        const response = await fetch(`http://13.234.75.74:3000/all-products/${pageNo}`)
        const parsedResponse = await response.json();
        
        if(parsedResponse.error) {
            throw new Error(parsedResponse.error)
        }
        return parsedResponse;

    } catch (error) {
        if(error instanceof Error) {
            return "Soemthing went wrong: " + error.message
        }
        return "Something went wrong"
    }
}

