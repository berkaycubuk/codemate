import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri)
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "codemate-sidebar",
      sidebarProvider
    )
  )

	let disposable = vscode.commands.registerCommand('codemate.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from codemate!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
