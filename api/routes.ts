import { healthCheck } from "./health.ts";
import { getUsers } from "./users.ts";

export async function handleApiRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const headers = { "content-type": "application/json", "access-control-allow-origin": "*" };

    try {
        switch (url.pathname) {
            case "/api/health":
                return new Response(JSON.stringify(await healthCheck()), { headers });
            case "/api/users":
                return new Response(JSON.stringify(await getUsers()), { headers });
            default:
                return new Response(JSON.stringify({ error: "Not Found" }), { status: 404, headers });
        }
    } catch (error) {
        console.error("API Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers });
    }
}
