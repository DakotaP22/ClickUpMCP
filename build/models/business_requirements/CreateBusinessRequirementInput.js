"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBusinessRequirementInputSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
exports.CreateBusinessRequirementInputSchema = v4_1.default.object({
    name: v4_1.default.string(),
    description: v4_1.default.string(),
    acceptanceCriteria: v4_1.default.array(v4_1.default.string()).optional()
});
