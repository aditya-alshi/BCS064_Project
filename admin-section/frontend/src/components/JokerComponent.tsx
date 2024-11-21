import { Form } from "react-router-dom"

export async function action() {
    const jwtToken = JSON.parse(localStorage.getItem('jwtToken') || "")
    const response = await fetch('http://localhost:5005/admin/joker', {
        method : "POST",
        headers : {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    return parsedResponse;

}

export default function JokerComponent() {
    return (
        <section>
            <Form method="post">
                <button type="submit">Submit</button>
            </Form>
        </section>
    )
}