export interface IUser {
  id: string;
  name: string;
}

// @TODO: Those are examples
export interface IServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface IClientToServerEvents {
  hello: () => void;
}

export interface IInterServerEvents {
  ping: () => void;
}

export interface ISocketData {
  name: string;
  age: number;
}
