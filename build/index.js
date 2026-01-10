#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_js_1 = require("@modelcontextprotocol/sdk/server/express.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const dotenv_1 = __importDefault(require("dotenv"));
const delete_handler_js_1 = require("./handlers/request/delete-handler.js");
const get_handler_js_1 = require("./handlers/request/get-handler.js");
const post_handler_js_1 = require("./handlers/request/post-handler.js");
const server_js_1 = require("./server/server.js");
// load environment variables from .env file
dotenv_1.default.config();
// Check if we should run in stdio mode (for VS Code) or HTTP mode
const USE_STDIO = process.env.MCP_TRANSPORT === 'stdio' || process.argv.includes('--stdio');
if (USE_STDIO) {
    // stdio mode - for VS Code and other stdio clients
    console.error(JSON.stringify({ message: "Starting ClickUp MCP Server (stdio mode)..." }));
    const server = (0, server_js_1.createServer)();
    const transport = new stdio_js_1.StdioServerTransport();
    server.connect(transport);
    console.error(JSON.stringify({ message: "ClickUp MCP Server ready (stdio mode)" }));
}
else {
    // HTTP mode - for HTTP clients
    console.log(JSON.stringify({ message: "Starting ClickUp MCP Server (HTTP mode)..." }));
    // Protection auto-enabled for localhost
    const app = (0, express_js_1.createMcpExpressApp)({ host: 'localhost' });
    const transports = {};
    app.post('/mcp', (0, post_handler_js_1.mcpPostHandler)(transports));
    app.get('/mcp', (0, get_handler_js_1.mcpGetHandler)(transports));
    app.delete('/mcp', (0, delete_handler_js_1.mcpDeleteHandler)(transports));
    const MCP_PORT = Number(process.env.MCP_PORT) || 3000;
    app.listen(MCP_PORT, (err) => {
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
                await transports[sessionId].close();
                delete transports[sessionId];
            }
            catch (error) {
                console.error(JSON.stringify({ error: `Error closing transport for session ${sessionId}`, details: error }));
            }
        }
        console.log('Server shutdown complete');
        process.exit(0);
    });
}
