export interface ISlashOption {
  name: string,
  description: string,
  type: string,
  required: boolean
}

export interface IConfig {
  [key: string]: any
}

export interface IEvent {
  Event: (client, ...args: any[]) => void | Promise<void>
}
