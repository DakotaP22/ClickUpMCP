#!/usr/bin/env node

// Redirect any stray stdout writes to stderr before imports
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
process.stdout.write = process.stderr.write.bind(process.stderr) as any;

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { createServer } from "./server/server.js";

console.error("Starting ClickUp MCP Server (stdio mode)...");

// Load environment variables from .env file
// Temporarily suppress console.log during dotenv loading
const originalConsoleLog = console.log;
console.log = () => {};
dotenv.config();
console.log = originalConsoleLog;

// Create the MCP server
const server = createServer();

// Create stdio transport
const transport = new StdioServerTransport();

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
