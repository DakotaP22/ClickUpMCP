"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChecklistClickUpResponseSchema = exports.ChecklistSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
const ChecklistItem_1 = require("./ChecklistItem");
exports.ChecklistSchema = v4_1.default.object({
    id: v4_1.default.string(),
    name: v4_1.default.string(),
    items: v4_1.default.array(ChecklistItem_1.ChecklistItemSchema)
});
exports.CreateChecklistClickUpResponseSchema = v4_1.default.object({
    checklist: exports.ChecklistSchema
});
