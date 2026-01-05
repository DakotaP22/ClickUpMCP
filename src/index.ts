#!/usr/bin/env node
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import dotenv from "dotenv";
import { mcpDeleteHandler } from "./handlers/request/delete-handler.js";
import { mcpGetHandler } from "./handlers/request/get-handler.js";
import { mcpPostHandler } from "./handlers/request/post-handler.js";
import { TransportSessionMap } from "./types/TransportSessionMap.js";

// load environment variables from .env file
dotenv.config();

// Protection auto-enabled for localhost
const app = createMcpExpressApp({ host: 'localhost' });
const transports: TransportSessionMap = {};

app.post('/mcp', mcpPostHandler(transports));
app.get('/mcp', mcpGetHandler(transports));
app.delete('/mcp', mcpDeleteHandler(transports));



const MCP_PORT = Number(process.env.MCP_PORT) || 3000;
app.listen(MCP_PORT, (err: any) => {
     if (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
    console.log(`MCP Streamable HTTP Server listening on port ${MCP_PORT}`);
});



process.on('SIGINT', async () => {
    console.log('Shutting down server...');

    // Close all active transports to properly clean up resources
    for (const sessionId in transports) {
        try {
            console.log(`Closing transport for session ${sessionId}`);
            await transports[sessionId]!.close();
            delete transports[sessionId];
        } catch (error) {
            console.error(`Error closing transport for session ${sessionId}:`, error);
        }
    }
    console.log('Server shutdown complete');
    process.exit(0);
});