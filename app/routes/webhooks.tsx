import stripe from 'stripe';
import { getProfileBystripeId, changetrial, changestripeId, changeSub } from "~/models/user.server";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

export const action = async ({ request }) => {
    const secret = process.env.STRIPE_ENDPOINT_SECRET;
    const sig = request.headers.get('stripe-signature');
    const payload = await request.text(); // clone the request object before reading its text

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(payload, sig, secret);
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        console.log("debugging values ->")
        console.log("secret", secret)
        console.log("sig", sig)
        console.log("payload", payload)
        return { status: 400 };
    }

    if (event.type === 'checkout.session.completed') {
        const userId = event.data.object.client_reference_id;
        const StripeCustomerId = event.data.object.customer;

        await changestripeId(StripeCustomerId, userId)
    }

    else if (event.type === 'customer.subscription.created') {
        let StripeCustomerId = event.data.object.customer;

        let profile = await getProfileBystripeId(StripeCustomerId)

        let status = event.data.object.status;

        await changetrial(false, profile.id)
        await changeSub(status, profile.id)

    }

    else if (event.type === 'customer.subscription.deleted') {
        let StripeCustomerId = event.data.object.customer;

        let profile = await getProfileBystripeId(StripeCustomerId)

        let status = event.data.object.status;
        await changetrial(false, profile.id)
        await changeSub(status, profile.id)

    }

    else if (event.type === 'customer.subscription.updated') {
        let StripeCustomerId = event.data.object.customer;

        let profile = await getProfileBystripeId(StripeCustomerId)

        let status = event.data.object.status;
        await changetrial(false, profile.id)
        await changeSub(status, profile.id)
        
    }

    else if (event.type === 'customer.subscription.paused') {
        let StripeCustomerId = event.data.object.customer;

        let profile = await getProfileBystripeId(StripeCustomerId)

        let status = event.data.object.status;
        await changetrial(false, profile.id)
        await changeSub(status, profile.id)
        
    }

    else if (event.type === 'customer.subscription.resumed') {
        let StripeCustomerId = event.data.object.customer;

        let profile = await getProfileBystripeId(StripeCustomerId)

        let status = event.data.object.status;
        await changetrial(false, profile.id)
        await changeSub(status, profile.id)

    }

    return {};
};



/*
Powershell
PS C:\Users\datpascal> cd downloads
PS C:\Users\datpascal\downloads> cd stripe_1.13.12_windows_x86_64
PS C:\Users\datpascal\downloads\stripe_1.13.12_windows_x86_64> .\stripe listen --forward-to localhost:3000/webhooks
*/