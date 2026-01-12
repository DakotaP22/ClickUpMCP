import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

export type TransportSessionMap = { [sessionId: string]: StreamableHTTPServerTransport };