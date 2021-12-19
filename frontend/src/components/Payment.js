import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const key = 'pk_test_51K8Kf1IcKij4uKdDjEc8Jg6Exc1ECRsyLllsejccvpIUf92pzJ9Pw7QAcCQTme8SMLIT2EI3UpPL3YdnxyAGXvFu00Akwq9RjW'

const Payment = () => {
    const onToken = (token) => {
        console.log(token);
    }
    return (
        <div>
            <StripeCheckout name="East Store Co." token={onToken} stripeKey={key}>
            <button >Success</button>
            </StripeCheckout>
        </div>
    )
}

export default Payment
