"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBusinessRequirementsInputSchema = exports.ScopeEnumSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
exports.ScopeEnumSchema = v4_1.default.enum(['all', 'open', 'closed', 'refinement_open', 'refinement_closed']);
exports.ListBusinessRequirementsInputSchema = v4_1.default.object({
    scope: exports.ScopeEnumSchema
});
