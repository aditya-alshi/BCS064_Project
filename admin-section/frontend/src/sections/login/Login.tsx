import { Form } from "react-router-dom"

export async function action( { request }: { request: Request } ) {
    const formData = await request.formData();
    const body = JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
    })
    const response = await fetch('http://localhost:5005/shh-xxx-hss/admin/login', {
        method: 'POST',
        headers : {
            "Content-Type": "application/json"
        },
        body: body
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    const jwtToken = parsedResponse.jwtToken;
    localStorage.setItem('jwtToken', JSON.stringify(jwtToken))
    return parsedResponse
}

export default function Login() {
    return (
        <section className="w-full h-[75vh] flex flex-col justify-center items-center ">
            Admin Login
            <Form className="bg-background  border p-3 flex flex-col gap-3" method="post" >
                <p className="">
                    <label htmlFor="email">
                        <input className="border p-2" required type="email" placeholder="Enter your email" id="email" name="email" />
                    </label>
                </p>
                <p className="">
                    <label htmlFor="password">
                        <input className="border p-2" required type="password" placeholder="Enter your password" id="password" name="password" />
                    </label>
                </p>
                <button className=" border w-full bg-lighterAccent text-white p-2 shadow-md active:shadow-none" type="submit">Login</button>
            </Form>
        </section>
    )
}