import { Request, Response } from "express";
import { TransportSessionMap } from "../../types/TransportSessionMap";

export const mcpDeleteHandler = (transports: TransportSessionMap) => async (req: Request, res: Response) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    if (!sessionId || !transports[sessionId]) {
        res.status(400).send('Invalid or missing session ID');
        return;
    }

    console.log(JSON.stringify({ message: `Received session termination request for session ${sessionId}` }));

    try {
        const transport = transports[sessionId];
        await transport.handleRequest(req, res);
    } catch (error) {
        console.error(JSON.stringify({ error: "Error handling session termination", details: error }));
        if (!res.headersSent) {
            res.status(500).send('Error processing session termination');
        }
    }
};