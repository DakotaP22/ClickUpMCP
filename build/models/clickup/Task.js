"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTasksClickUpResponseSchema = exports.TaskSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
exports.TaskSchema = v4_1.default.object({
    id: v4_1.default.string(),
    name: v4_1.default.string(),
    status: v4_1.default.object({
        status: v4_1.default.string(),
        type: v4_1.default.string()
    }),
    checklists: v4_1.default.array(v4_1.default.object({
        id: v4_1.default.string(),
        name: v4_1.default.string(),
        items: v4_1.default.array(v4_1.default.object({
            id: v4_1.default.string(),
            name: v4_1.default.string(),
            resolved: v4_1.default.boolean()
        }))
    }))
});
exports.GetTasksClickUpResponseSchema = v4_1.default.object({
    tasks: exports.TaskSchema.array()
});
