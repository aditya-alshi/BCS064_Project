import { Form, useActionData } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  const formdata = await request.formData();
  const jwtToken = JSON.parse(localStorage.getItem("jwtToken") || "");
  const response = await fetch("http://13.234.75.74:3000/seller/addNewProduct", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    body: formdata,
  });
  const parsedResponse = await response.json();
  console.log(parsedResponse);
  return { parsedResponse };
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
    <section className="w-full min-h-screen flex justify-center items-center bg-background py-8 px-4">
      <div className="w-full max-w-2xl">
        {/* Title */}
        <p className="text-accent text-2xl font-bold mb-6 text-center">
          Submit a new product for approval
        </p>

        {/* Form */}
        <Form
          method="post"
          encType="multipart/form-data"
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          {/* Display Success/Error Message */}
          {actionData && (
            <p
              className={`text-center mb-4 font-medium ${
                actionData.statusCode === 200
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {actionData.parsedResponse.message ||
                actionData.parsedResponse.error}
            </p>
          )}

          {/* Product Image */}
          <div className="mb-4">
            <label
              htmlFor="productImage"
              className="block text-accent font-medium mb-2"
            >
              Product Image:
            </label>
            <input
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
              type="file"
              name="productImage"
              id="productImage"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-accent font-medium mb-2"
            >
              Product Category:
            </label>
            <select
              required
              name="category"
              id="category"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
            >
              <option value="">Choose a Category</option>
              <optgroup label="Sweets">
                <option value="ladoo">Ladoo</option>
                <option value="burfi">Burfi</option>
                <option value="pak">Pak</option>
                <option value="ghewar">Ghewar</option>
                <option value="dessert">Dessert</option>
              </optgroup>
              <optgroup label="Savories">
                <option value="khakra">Khakra</option>
                <option value="murukku">Murukku</option>
                <option value="sev">Sev</option>
                <option value="snacks">Snacks</option>
              </optgroup>
            </select>
          </div>

          {/* Category Type */}
          <div className="mb-4">
            <label
              htmlFor="categoryType"
              className="block text-accent font-medium mb-2"
            >
              Product Type:
            </label>
            <select
              required
              name="categoryType"
              id="categoryType"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
            >
              <option value="">Choose Type</option>
              <option value="sweet">Sweet</option>
              <option value="savory">Savory</option>
            </select>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-accent font-medium mb-2"
            >
              Product Name:
            </label>
            <input
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
              type="text"
              name="productName"
              id="productName"
              placeholder="Enter product name"
            />
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-accent font-medium mb-2"
            >
              Product Description:
            </label>
            <textarea
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none resize-none"
              name="productDescription"
              id="productDescription"
              rows={4}
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-accent font-medium mb-2"
            >
              Stock:
            </label>
            <input
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
              type="number"
              name="stock"
              id="stock"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-accent font-medium mb-2"
            >
              Price:
            </label>
            <input
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
              type="number"
              name="price"
              id="price"
              placeholder="Enter product price"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-accent text-white font-medium rounded-md hover:bg-lighterAccent transition-transform transform hover:scale-105 focus:ring-2 focus:ring-lighterAccent focus:ring-offset-2 focus:outline-none"
          >
            Submit
          </button>
        </Form>
      </div>
    </section>
  );
}
