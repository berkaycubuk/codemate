"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const authenticate_1 = require("./authenticate");
const constants_1 = require("./constants");
const getNonce_1 = require("./getNonce");
const TokenManager_1 = require("./TokenManager");
class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [
                // this._extensionUri
                vscode.Uri.joinPath(this._extensionUri, "media"),
                vscode.Uri.joinPath(this._extensionUri, "out/compiled"),
            ]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'logout': {
                    TokenManager_1.TokenManager.setToken('');
                    break;
                }
                case 'authenticate': {
                    authenticate_1.default(() => {
                        webviewView.webview.postMessage({
                            type: 'token',
                            value: TokenManager_1.TokenManager.getToken()
                        });
                    });
                    break;
                }
                case 'get-token': {
                    webviewView.webview.postMessage({
                        type: 'token',
                        value: TokenManager_1.TokenManager.getToken()
                    });
                    break;
                }
            }
        });
    }
    _getHtmlForWebview(webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out/compiled", "Welcome.js"));
        // Do the same for the stylesheet.
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));
        // Use a nonce to only allow a specific script to be run.
        const nonce = getNonce_1.default();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">
        <script nonce="${nonce}">
          const tsvscode = acquireVsCodeApi()
          const apiUrl = ${JSON.stringify(constants_1.apiUrl)}
        </script>
			</head>
			<body>
        <script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
    }
}
exports.default = SidebarProvider;
SidebarProvider.viewType = 'codemate-sidebar';
//# sourceMappingURL=SidebarProvider.js.map