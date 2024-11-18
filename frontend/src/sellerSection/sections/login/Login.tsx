import { Form, Link, redirect, useActionData } from "react-router-dom"

export async function action({ request }: {request: Request}) {
    const formData = await request.formData();
    console.log()
    const response = await fetch("http://localhost:5000/seller/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Ensure the server knows you're sending JSON
        },
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password")
        })
    })

    if(response.status === 200) return redirect('/panel/seller/');
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    return parsedResponse
}

export default function Login () {
    
    const actionData = useActionData() as {
        message?: string,
        error?: string
    }

    return (
        <section className="flex w-full flex-col justify-center items-center ">
            <p>{actionData?.message || "Hello Mrs. Raichand"}</p>
            <Form className="p-4 max-w-[30rem] border" method="post">
                <p className="mt-4">
                    Email: 
                    <input className="border" required type="email" name="email" id="email" />
                </p>
                <p className="mt-4">
                    password
                    <input className="border" required type="password" name="password" id="password" />
                </p>
                <p className="mt-4">
                    <button className=" active:outline-2 hover:scale-x-[1.025] py-1 w-full bg-lighterAccent text-white " type="submit">Login</button>
                </p>
            </Form >
            <p>Don't have an Account? <Link to={'/panel/seller/register'} className="text-accent font-bold underline hover:no-underline">Register</Link></p>
        </section>
    )
}