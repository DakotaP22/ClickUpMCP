import { InMemoryEventStore } from "@modelcontextprotocol/sdk/examples/shared/inMemoryEventStore.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { randomUUID } from "node:crypto";
// import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { Request, Response } from "express";
import { TransportSessionMap } from "../../models/TransportSessionMap";
import { createServer } from "../../server/server";

export const mcpPostHandler = (transports: TransportSessionMap) => async (req: Request, res: Response) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    if (sessionId) {
        console.log(JSON.stringify({ message: `Received MCP request for session: ${sessionId}` }));
    }

    
    try {
        let transport: StreamableHTTPServerTransport;
        if (sessionId && transports[sessionId]) {
            transport = transports[sessionId];
        } else if (!sessionId && isInitializeRequest(req.body)) {
            transport = new StreamableHTTPServerTransport({
                sessionIdGenerator: () => randomUUID(),
                eventStore: new InMemoryEventStore(),
                onsessioninitialized: sessionId => {
                    console.log(JSON.stringify({ message: `Session initialized with ID: ${sessionId}` }));
                    transports[sessionId] = transport;
                }
            });

            transport.onclose = () => {
                const sid = transport.sessionId;
                if (sid && transports[sid]) {
                    console.log(JSON.stringify({ message: `Session closed with ID: ${sid}` }));
                    delete transports[sid];
                }
            }

            const server = createServer();
            server.connect(transport);
        } else {
            return res.status(400).send('Invalid MCP request: Missing or unknown session ID');
        }

        await transport.handleRequest(req, res, req.body);
        return;
    } catch (err) {
        console.error(JSON.stringify({ error: "Error handling MCP request", details: err }));
        return res.status(500).send('Internal Server Error');
    }
}

function isInitializeRequest(req: Request) {
    return true;
}