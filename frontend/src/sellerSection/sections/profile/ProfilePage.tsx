import { Link } from "react-router-dom"

export async function loader() {
    const response = await fetch('')
}

export default function ProfilePage() {
    return (
        <section>
            <Link to={'/panel/seller/profile/edit'} className="border p-2 text-yellowish border-accent shadow-md active:shadow-none">Edit Profile</Link>
        </section>
    )
}