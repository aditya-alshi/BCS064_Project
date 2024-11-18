import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";

export async function action({ request }: { request: Request }) {
  const formdata = await request.formData();
  const formEntires = Array.from(formdata.entries()).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, FormDataEntryValue>
  );

  const body = JSON.stringify(formEntires);

  const response = await fetch("http://localhost:5000/seller/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure the server knows you're sending JSON
    },
    body: body,
  });

  const parsedResponse = await response.json();

  return { parsedResponse, statusCode: response.status };
}

export default function Register() {
  const actionData = useActionData() as {
    parsedResponse: {
      message?: string;
    };
    statusCode: number;
  };

  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <p>{(actionData && actionData.parsedResponse.message) || "Register"}</p>
      {actionData && actionData.statusCode === 201 ? (
        <Link
          className="text-lighterAccent underline hover:no-underline"
          to={"/panel/seller/login"}
        >
          Go to login page
        </Link>
      ) : (
        ""
      )}
      <Form
        className="max-w-[40rem] flex flex-col justify-center items-center"
        method="post"
      >
        <label className="block" htmlFor="email">
          <span>Email</span>
          <input
            className="border"
            required
            type="email"
            id="email"
            name="email"
          />
        </label>
        <label className="block" htmlFor="password">
          <span>Password</span>
          <input
            className="border"
            required
            type="password"
            id="password"
            name="password"
          />
        </label>
        <label htmlFor="bussinessName">
          <span>Business name</span>
          <input
            className="border"
            required
            type="text"
            id="bussinessName"
            name="bussinessName"
          />
        </label>
        <label htmlFor="phoneNumber">
          <span>Contact no: </span>
          <input
            className="border"
            required
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
          />
        </label>
        <label htmlFor="addressLine1">
          <span>Address Line 1 </span>
          <input
            className="border"
            required
            type="text"
            id="addressLine1"
            name="addressLine1"
          />
        </label>
        <label htmlFor="addressLine2">
          <span>Address Line 2 </span>
          <input
            className="border"
            required
            type="text"
            id="addressLine2"
            name="addressLine2"
          />
        </label>
        <label htmlFor="city">
          <span>City </span>
          <input
            className="border"
            required
            type="text"
            id="city"
            name="city"
          />
        </label>
        <label htmlFor="country">
          <span>Country </span>
          <input
            className="border"
            required
            type="text"
            id="country"
            name="country"
          />
        </label>
        <label htmlFor="zipCode">
          <span>Zip Code </span>
          <input
            className="border"
            required
            type="text"
            id="zipCode"
            name="zipCode"
          />
        </label>
        <p className="mt-4 w-full">
          <button
            className=" active:outline-2 hover:scale-x-[1.025] py-1 w-full bg-lighterAccent text-white "
            type="submit"
          >
            Register
          </button>
        </p>
      </Form>
    </section>
  );
}
