import type { Request, Response } from 'express';
import { TransportSessionMap } from '../../models/TransportSessionMap.js';

export const mcpGetHandler = (transports: TransportSessionMap) => async (req: Request, res: Response) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    if (!sessionId || !transports[sessionId]) {
        res.status(400).send('Invalid or missing session ID');
        return;
    }

    // Check for Last-Event-ID header for resumability
    const lastEventId = req.headers['last-event-id'] as string | undefined;
    if (lastEventId) {
        console.log(JSON.stringify({ message: `Client reconnecting with Last-Event-ID: ${lastEventId}` }));
    } else {
        console.log(`Establishing new SSE stream for session ${sessionId}`);
    }

    const transport = transports[sessionId];
    await transport.handleRequest(req, res);
};