declare module 'imap-simple' {
  import { EventEmitter } from 'events'

  export interface ImapConfig {
    user: string
    password: string
    host: string
    port: number
    tls: boolean
    authTimeout?: number
  }

  export interface ImapMessage {
    parts: Array<{ body: string }>
  }

  export interface ImapConnection extends EventEmitter {
    openBox(mailboxName: string): Promise<void>
    search(criteria: any[], options: any): Promise<ImapMessage[]>
    end(): Promise<void>
  }

  export function connect(config: { imap: ImapConfig }): Promise<ImapConnection>
}
