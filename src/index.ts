#!/usr/bin/env node
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { mcpDeleteHandler } from "./handlers/request/delete-handler.js";
import { mcpGetHandler } from "./handlers/request/get-handler.js";
import { mcpPostHandler } from "./handlers/request/post-handler.js";
import { createServer } from "./server/server.js";
import { TransportSessionMap } from "./types/TransportSessionMap.js";

// load environment variables from .env file
dotenv.config();

// Check if we should run in stdio mode (for VS Code) or HTTP mode
const USE_STDIO = process.env.MCP_TRANSPORT === 'stdio' || process.argv.includes('--stdio');

if (USE_STDIO) {
    // stdio mode - for VS Code and other stdio clients
    console.error("Starting ClickUp MCP Server (stdio mode)...");
    
    const server = createServer();
    const transport = new StdioServerTransport();
    server.connect(transport);
    
    console.error("ClickUp MCP Server ready (stdio mode)");
} else {
    // HTTP mode - for HTTP clients
    console.log("Starting ClickUp MCP Server (HTTP mode)...");
    
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
        console.log('Shutting down HTTP server...');

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
}