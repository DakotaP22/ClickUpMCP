"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChecklistHandlerInputSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
exports.UpdateChecklistHandlerInputSchema = v4_1.default.object({
    checklistId: v4_1.default.string(),
    checklistItemId: v4_1.default.string(),
    resolved: v4_1.default.boolean().optional().default(false),
});
