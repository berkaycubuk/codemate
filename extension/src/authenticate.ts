import * as vscode from 'vscode'
import * as polka from 'polka'
import { TokenManager } from './TokenManager'

const authenticate = (fn: () => void) => {
  const app = polka()

  app.get('/auth/:token', async (req, res) => {
    const { token } = req.params
    if (!token) {
      res.end(`<h1>Something went wrong :(</h1>`)
      return
    }

    await TokenManager.setToken(token)
    fn()

    res.end(`<h1>Auth was successful, you can close this now</h1>`);

    (app as any).server.close()
  })

  app.listen(54321, (err: Error) => {
    if (err) {
      vscode.window.showErrorMessage(err.message)
    } else {
      vscode.commands.executeCommand(
        'vscode.open',
        vscode.Uri.parse('https://github.com/login/oauth/authorize?client_id=874c8b8f25b7277b9b30')
      )
    }
  })
}

export default authenticate