import PaymentComponent from "../../buttons/PaymentComponent";
export default function Checkout(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F2EEEC] p-1 m-1 rounded shadow">
      <h1 className="text-center text-4xl mb-6">Checkout</h1>
      <PaymentComponent />
    </div>
  );
}
