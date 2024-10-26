import { healthCheck } from "./health.ts";
import { getUsers } from "./users.ts";

export function handleApiRequest(req: Request): Response {
    const url = new URL(req.url);
    const headers = {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
    };

    try {
        switch (url.pathname) {
            case "/api/health":
                return new Response(JSON.stringify(healthCheck()), { headers });
            case "/api/users":
                return new Response(JSON.stringify(getUsers()), { headers });
            default:
                return new Response(JSON.stringify({ error: "Not Found" }), {
                    status: 404,
                    headers,
                });
        }
    } catch (error) {
        console.error("API Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers },
        );
    }
}
