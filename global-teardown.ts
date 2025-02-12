import * as fs from 'fs'
import * as path from 'path'

const rootDir = process.cwd()
const sessionsDir = path.join(rootDir, 'sessions')
const sessionFilePath = path.join(
  sessionsDir,
  `storageState.${process.env.NODE_ENV || 'production'}.json`
)

async function globalTeardown() {
  // Remove session file
  if (fs.existsSync(sessionFilePath)) {
    console.log('Deleting session file:', sessionFilePath)
    fs.unlinkSync(sessionFilePath)
  }
  // Remove sessions directory
  if (fs.existsSync(sessionsDir)) {
    console.log('Deleting sessions directory...')
    fs.rmSync(sessionsDir, { recursive: true, force: true })
  }
}

export default globalTeardown
