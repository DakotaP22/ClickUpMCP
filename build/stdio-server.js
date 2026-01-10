#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const dotenv_1 = __importDefault(require("dotenv"));
const server_js_1 = require("./server/server.js");
console.error("Starting ClickUp MCP Server (stdio mode)...");
// Load environment variables from .env file
dotenv_1.default.config();
// Create the MCP server
const server = (0, server_js_1.createServer)();
// Create stdio transport
const transport = new stdio_js_1.StdioServerTransport();
// Connect server to transport
server.connect(transport);
console.error("ClickUp MCP Server ready (stdio mode)");
// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.error('Shutting down server...');
    await transport.close();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.error('Shutting down server...');
    await transport.close();
    process.exit(0);
});
