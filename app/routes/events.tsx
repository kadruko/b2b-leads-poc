import { ActionFunctionArgs } from "@remix-run/node";
import { getClientIPAddress } from "remix-utils/get-client-ip-address";

export const action = async ({ request }: ActionFunctionArgs & {
    request: {socket: any}
}) => {
    console.log('EVENT_RECEIVED');

    const ipAddress = getClientIPAddress(request);
    console.log('CLIENT_IP', ipAddress);

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