// index.d.ts
declare module "sockjs-client" {
  const SockJS: {
      new(url: string, _reserved?: any, options?: SockJS.Options): WebSocket;
      (url: string, _reserved?: any, options?: SockJS.Options): WebSocket;
      prototype: WebSocket;
      CONNECTING: SockJS.CONNECTING;
      OPEN: SockJS.OPEN;
      CLOSING: SockJS.CLOSING;
      CLOSED: SockJS.CLOSED;
  };

  namespace SockJS {
      type CONNECTING = 0;
      type OPEN = 1;
      type CLOSING = 2;
      type CLOSED = 3;

      type State = CONNECTING | OPEN | CLOSING | CLOSED;

      interface BaseEvent extends Event {
          type: string;
      }

      type OpenEvent = BaseEvent;

      interface CloseEvent extends BaseEvent {
          code: number;
          reason: string;
          wasClean: boolean;
      }

      interface MessageEvent extends BaseEvent {
          data: string;
      }

      type SessionGenerator = () => string;

      interface Options {
          server?: string | undefined;
          sessionId?: number | SessionGenerator | undefined;
          transports?: string | string[] | undefined;
          timeout?: number | undefined;
      }
  }

  export = SockJS;
}
