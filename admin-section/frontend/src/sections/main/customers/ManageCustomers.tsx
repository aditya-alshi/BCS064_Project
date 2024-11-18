import { allCustomers } from "../../../data/dummyDB"

export default function ManageCustomers() {

    const renderCustomers = allCustomers.map(customer => (
        <tr className="text-start">
            <td className="border border-collapse border-gray-300 p-1">{customer.name}</td>
            <td className="border border-collapse border-gray-300 p-1">{customer.email}</td>
        </tr>
    ))

    return (
        <section className="w-[86%] m-auto">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr className="text-center">
                        <th className="border border-collapse border-gray-300 p-1">Name</th>
                        <th className="border border-collapse border-gray-300 p-1">Email</th>
                    </tr>
                </thead>
                <tbody>
                    { renderCustomers }
                </tbody>
            </table>
        </section>
    )
}