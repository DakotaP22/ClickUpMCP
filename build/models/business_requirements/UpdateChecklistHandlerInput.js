"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRefinementChecklistHandlerInputSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
exports.UpdateRefinementChecklistHandlerInputSchema = v4_1.default.object({
    checklistId: v4_1.default.string(),
    checkklistItemId: v4_1.default.string(),
    resolved: v4_1.default.boolean().optional().default(false),
});
