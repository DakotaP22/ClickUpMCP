#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { createServer } from "./server/server.js";

console.error(JSON.stringify({ message: "Starting ClickUp MCP Server (stdio mode)..." }));

// Load environment variables from .env file
dotenv.config();

// Create the MCP server
const server = createServer();

// Create stdio transport
const transport = new StdioServerTransport();

// Connect server to transport
server.connect(transport);

console.error(JSON.stringify({ message: "ClickUp MCP Server ready (stdio mode)" }));

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.error(JSON.stringify({ message: "Shutting down server..." }));
    await transport.close();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.error(JSON.stringify({ message: "Shutting down server..." }));
    await transport.close();
    process.exit(0);
});
