#!/usr/bin/env node
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { mcpDeleteHandler } from "./features/core/delete-handler.js";
import { mcpGetHandler } from "./features/core/get-handler.js";
import { mcpPostHandler } from "./features/core/post-handler.js";
import { createServer } from "./server/server.js";
import { TransportSessionMap } from "./models/TransportSessionMap.js";

// load environment variables from .env file
// Temporarily suppress console.log during dotenv loading
const originalConsoleLog = console.log;
console.log = () => {};
dotenv.config();
console.log = originalConsoleLog;

// Check if we should run in stdio mode (for VS Code) or HTTP mode
const USE_STDIO = process.env.MCP_TRANSPORT === 'stdio' || process.argv.includes('--stdio');

if (USE_STDIO) {
    // stdio mode - for VS Code and other stdio clients
    console.error(JSON.stringify({ message: "Starting ClickUp MCP Server (stdio mode)..." }));
    
    const server = createServer();
    const transport = new StdioServerTransport();
    server.connect(transport);
    
    console.error(JSON.stringify({ message: "ClickUp MCP Server ready (stdio mode)" }));
} else {
    // HTTP mode - for HTTP clients
    console.log(JSON.stringify({ message: "Starting ClickUp MCP Server (HTTP mode)..." }));
    
    // Protection auto-enabled for localhost
    const app = createMcpExpressApp({ host: 'localhost' });
    const transports: TransportSessionMap = {};

    app.post('/mcp', mcpPostHandler(transports));
    app.get('/mcp', mcpGetHandler(transports));
    app.delete('/mcp', mcpDeleteHandler(transports));

    const MCP_PORT = Number(process.env.MCP_PORT) || 3000;
    app.listen(MCP_PORT, (err: any) => {
        if (err) {
            console.error(JSON.stringify({ error: "Failed to start server", details: err }));
            process.exit(1);
        }
        console.log(JSON.stringify({ message: `MCP Streamable HTTP Server listening on port ${MCP_PORT}` }));
    });

    process.on('SIGINT', async () => {
        console.log(JSON.stringify({ message: "Shutting down HTTP server..." }));

        // Close all active transports to properly clean up resources
        for (const sessionId in transports) {
            try {
                console.log(JSON.stringify({ message: `Closing transport for session ${sessionId}` }));
                await transports[sessionId]!.close();
                delete transports[sessionId];
            } catch (error) {
                console.error(JSON.stringify({ error: `Error closing transport for session ${sessionId}`, details: error }));
            }
        }
        console.log('Server shutdown complete');
        process.exit(0);
    });
}