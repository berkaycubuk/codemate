import * as vscode from 'vscode'

const KEY = 'codematetoken'

export class TokenManager {
  static globalState: vscode.Memento

  static setToken(token: string) {
    return this.globalState.update(KEY, token) 
  }

  static getToken(): string | undefined {
    return this.globalState.get(KEY)
  }
}