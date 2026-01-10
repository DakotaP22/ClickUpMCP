#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Redirect any stray stdout writes to stderr before imports
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
process.stdout.write = process.stderr.write.bind(process.stderr);
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const dotenv_1 = __importDefault(require("dotenv"));
const server_js_1 = require("./server/server.js");
console.error("Starting ClickUp MCP Server (stdio mode)...");
// Load environment variables from .env file
// Temporarily suppress console.log during dotenv loading
const originalConsoleLog = console.log;
console.log = () => { };
dotenv_1.default.config();
console.log = originalConsoleLog;
// Create the MCP server
const server = (0, server_js_1.createServer)();
// Create stdio transport
const transport = new stdio_js_1.StdioServerTransport();
// Restore stdout for MCP protocol communication
process.stdout.write = originalStdoutWrite;
// Connect server to transport
server.connect(transport);
console.error("ClickUp MCP Server ready (stdio mode)");
// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.error("Shutting down server...");
    await transport.close();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.error("Shutting down server...");
    await transport.close();
    process.exit(0);
});
