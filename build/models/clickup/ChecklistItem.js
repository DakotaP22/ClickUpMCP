"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistItemSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
exports.ChecklistItemSchema = v4_1.default.object({
    id: v4_1.default.string(),
    name: v4_1.default.string(),
    resolved: v4_1.default.boolean()
});
