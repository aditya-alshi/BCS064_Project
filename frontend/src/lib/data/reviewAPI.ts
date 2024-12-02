export async function sendReview(formData: FormData) {
    const completeReviewObject = Array.from(formData.entries()).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, FormDataEntryValue>);

      try{
          const jwtCustomerToken = JSON.parse(localStorage.getItem('jwtCustomerToken') || "")
          const body = JSON.stringify(completeReviewObject)
          const response: Response  = await fetch('http://localhost:5000/product/review', {
              method: "POST",
              headers: {
                    'Content-Type' : "application/json",
                  Authorization: `Bearer ${jwtCustomerToken}`,
                },
              body: body,
          })
          if(response.status === 201) {
            return "Review Added successfully"
          } else {
            return "Review not added. Try again later"
          }

      } catch (error) {
        return "Review not added. Try again later"
      }
}

export async function getReviewById(productId: string) {
    try{
        const response = await fetch(`http://localhost:5000/product/review/${productId}`)
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