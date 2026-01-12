"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcpPostHandler = void 0;
const inMemoryEventStore_js_1 = require("@modelcontextprotocol/sdk/examples/shared/inMemoryEventStore.js");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const node_crypto_1 = require("node:crypto");
const server_1 = require("../../server/server");
const mcpPostHandler = (transports) => async (req, res) => {
    const sessionId = req.headers['mcp-session-id'];
    if (sessionId) {
        console.log(JSON.stringify({ message: `Received MCP request for session: ${sessionId}` }));
    }
    try {
        let transport;
        if (sessionId && transports[sessionId]) {
            transport = transports[sessionId];
        }
        else if (!sessionId && isInitializeRequest(req.body)) {
            transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
                sessionIdGenerator: () => (0, node_crypto_1.randomUUID)(),
                eventStore: new inMemoryEventStore_js_1.InMemoryEventStore(),
                onsessioninitialized: sessionId => {
                    console.log(JSON.stringify({ message: `Session initialized with ID: ${sessionId}` }));
                    transports[sessionId] = transport;
                }
            });
            transport.onclose = () => {
                const sid = transport.sessionId;
                if (sid && transports[sid]) {
                    console.log(JSON.stringify({ message: `Session closed with ID: ${sid}` }));
                    delete transports[sid];
                }
            };
            const server = (0, server_1.createServer)();
            server.connect(transport);
        }
        else {
            return res.status(400).send('Invalid MCP request: Missing or unknown session ID');
        }
        await transport.handleRequest(req, res, req.body);
        return;
    }
    catch (err) {
        console.error(JSON.stringify({ error: "Error handling MCP request", details: err }));
        return res.status(500).send('Internal Server Error');
    }
};
exports.mcpPostHandler = mcpPostHandler;
function isInitializeRequest(req) {
    return true;
}
