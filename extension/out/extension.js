"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const SidebarProvider_1 = require("./SidebarProvider");
const authenticate_1 = require("./authenticate");
const TokenManager_1 = require("./TokenManager");
function activate(context) {
    TokenManager_1.TokenManager.globalState = context.globalState;
    const provider = new SidebarProvider_1.default(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(SidebarProvider_1.default.viewType, provider));
    context.subscriptions.push(vscode.commands.registerCommand('codemate.authenticate', () => {
        authenticate_1.default(() => { });
    }));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map