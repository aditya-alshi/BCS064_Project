import { allSellers } from "../../../data/dummyDB"

export default function ManageSellers() {

    const renderSellers = allSellers.map(seller => (
        <tr key={seller.sellerId} className="text-start p-1">
            <td className="border border-collapse border-gray-300 p-1">{seller.businessName}</td>
            <td className="border border-collapse border-gray-300 p-1">{seller.storeAddress}</td>
            <td className="border border-collapse border-gray-300 p-1">{seller.approval_status}</td>
        </tr>
    ))

    return (
        <section className=" w-[86%] m-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 text-center p-1">
                        <th className="border border-collapse border-gray-300 p-1">Business Name</th>
                        <th className="border border-collapse border-gray-300 p-1">Address</th>
                        <th className="border border-collapse border-gray-300 p-1">Approval Status</th>
                    </tr>
                </thead>
                <tbody>
                    { renderSellers }
                </tbody>
            </table>
        </section>
    )
}