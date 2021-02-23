import * as vscode from 'vscode'
import SidebarProvider from './SidebarProvider'
import authenticate from './authenticate'
import { TokenManager } from './TokenManager';

export function activate(context: vscode.ExtensionContext) {
  TokenManager.globalState = context.globalState

  const provider = new SidebarProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(SidebarProvider.viewType, provider));

  context.subscriptions.push(
    vscode.commands.registerCommand('codemate.authenticate', () => {
      authenticate(() => {})
    })
  )
}
