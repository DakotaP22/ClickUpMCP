"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBusinessRequirementOutputSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
exports.CreateBusinessRequirementOutputSchema = v4_1.default.object({
    taskId: v4_1.default.string(),
    taskUrl: v4_1.default.string()
});
