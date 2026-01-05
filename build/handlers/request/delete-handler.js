"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcpDeleteHandler = void 0;
const mcpDeleteHandler = (transports) => async (req, res) => {
    const sessionId = req.headers['mcp-session-id'];
    if (!sessionId || !transports[sessionId]) {
        res.status(400).send('Invalid or missing session ID');
        return;
    }
    console.log(`Received session termination request for session ${sessionId}`);
    try {
        const transport = transports[sessionId];
        await transport.handleRequest(req, res);
    }
    catch (error) {
        console.error('Error handling session termination:', error);
        if (!res.headersSent) {
            res.status(500).send('Error processing session termination');
        }
    }
};
exports.mcpDeleteHandler = mcpDeleteHandler;
