import { ActionFunctionArgs } from "@remix-run/node";
import { unauthenticated } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    console.log('EVENT_RECEIVED');

    const hmac = request.headers.get('x-shopify-hmac-sha256');

    //const x = await authenticate.public.appProxy(request);
    //console.log('PUBLIC', x);

    const context = await unauthenticated.storefront('b2b-leads-poc.myshopify.com');

    const body = await request.text();
    const event = JSON.parse(body);
    console.log('PAYLOAD', event);

    // How can I authenticate the request was sent from the Shopify Web Pixel?
    

    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}