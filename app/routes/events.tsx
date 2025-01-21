import { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    console.log('EVENT_RECEIVED');

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