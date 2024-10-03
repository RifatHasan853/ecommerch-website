

        //import { Elements } from "@stripe/react-stripe-js";
        //import CheckoutForm from "./CheckoutForm";
        
        import { loadStripe } from "@stripe/stripe-js";
        
        import { Elements } from "@stripe/react-stripe-js";
        import CheckoutForm from "./CheckoutForm";
        import SectionTitle from "../../components/SectionTitle";
        
        
        // TODO: add publishable key
        const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
        const Payments = () => {
            return (
                <div className=" ">
                    <SectionTitle heading="Payment" subHeading="Please pay for purchese "></SectionTitle>
                    <div className=" w-[60%] lg:ml-40  ml-20">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm></CheckoutForm>
                        </Elements>
                    </div>
                </div>
            );
        };
        
        export default Payments;