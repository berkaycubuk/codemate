import * as vscode from 'vscode'
import authenticate from './authenticate';
import { apiUrl } from './constants';
import getNonce from './getNonce'
import { TokenManager } from './TokenManager';

export default class SidebarProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'codemate-sidebar';

	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
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
          TokenManager.setToken('')
          break
        }
        case 'authenticate': {
          authenticate(() => {
            webviewView.webview.postMessage({
               type: 'token',
               value: TokenManager.getToken()
            })
          })
          break
        }
				case 'get-token': {
            webviewView.webview.postMessage({
              type: 'token',
              value: TokenManager.getToken()
          })
					break
				}
			}
		});
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out/compiled", "Welcome.js")
    )

		// Do the same for the stylesheet.
		const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
		const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
		const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

		// Use a nonce to only allow a specific script to be run.
		const nonce = getNonce();

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
          const apiUrl = ${JSON.stringify(apiUrl)}
        </script>
			</head>
			<body>
        <script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}