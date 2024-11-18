import { allImages, allProducts } from "../dummyDB"

export const ProductModel = {
    // get all the products from main data base and images form images database and combine them
    allProduct_including_images: (pageNo: number) => {
        const offset = (pageNo-1) * 3
        const response = allProducts.slice(offset, offset + 3)
        const products_with_images = response.map(p => {
            const image = allImages.find(img => img.image_name === p.product_name)
            return {
                ...p,
                product_image: image? image.Image_url : ""
            }
        })
        return products_with_images
    },

    product_by_id : (productId: string) => {
        const response = allProducts.find(product => product.product_id === productId);
        if(response) return response
        else return new Error("No product found for id " + productId);
    }

}