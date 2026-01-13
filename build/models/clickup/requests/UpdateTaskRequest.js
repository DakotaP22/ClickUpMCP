"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskRequestSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
exports.UpdateTaskRequestSchema = v4_1.default.object({
    taskId: v4_1.default.string(),
    name: v4_1.default.string().optional(),
    description: v4_1.default.string().optional(),
    status: v4_1.default.string().optional(),
});
