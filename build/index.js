#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_js_1 = require("@modelcontextprotocol/sdk/server/express.js");
const dotenv_1 = __importDefault(require("dotenv"));
const delete_handler_js_1 = require("./handlers/request/delete-handler.js");
const get_handler_js_1 = require("./handlers/request/get-handler.js");
const post_handler_js_1 = require("./handlers/request/post-handler.js");
// load environment variables from .env file
dotenv_1.default.config();
// Protection auto-enabled for localhost
const app = (0, express_js_1.createMcpExpressApp)({ host: 'localhost' });
const transports = {};
app.post('/mcp', (0, post_handler_js_1.mcpPostHandler)(transports));
app.get('/mcp', (0, get_handler_js_1.mcpGetHandler)(transports));
app.delete('/mcp', (0, delete_handler_js_1.mcpDeleteHandler)(transports));
const MCP_PORT = Number(process.env.MCP_PORT) || 3000;
app.listen(MCP_PORT, (err) => {
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
            await transports[sessionId].close();
            delete transports[sessionId];
        }
        catch (error) {
            console.error(`Error closing transport for session ${sessionId}:`, error);
        }
    }
    console.log('Server shutdown complete');
    process.exit(0);
});
