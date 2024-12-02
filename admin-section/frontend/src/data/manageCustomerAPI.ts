export async function getAllCustomer(pageNo: number) {
    try {
        const response = await fetch(`http://localhost:5005/shh-xxx-hss/admin/all-customers/${pageNo}`, {
            method: "GET",
            // headers: headers
        });
        const parsedresponse = await response.json()
        return parsedresponse
    } catch (error) {
        return {
            error: "Something went wrong client-side-server-response-error"
        }
    }
}