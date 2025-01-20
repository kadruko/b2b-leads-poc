import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function action({request, params}: ActionFunctionArgs) {
    const context = await authenticate.public.appProxy(request);
    
    const body = await request.text();
    const event = JSON.parse(body);
    console.log('PAYLOAD', event);

    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}