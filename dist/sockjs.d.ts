// index.d.ts
declare module "sockjs-client" {
  const SockJS: {
      new(url: string, _reserved?: any, options?: SockJS.Options): SockJS.Socket;
      (url: string, _reserved?: any, options?: SockJS.Options): SockJS.Socket;
      prototype: SockJS.Socket;
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

      /**
       * Dispatched on the `SockJS` instance once a transport that reported
       * backpressure (i.e. `send()` returned `false`) can accept data again.
       */
      interface DrainEvent extends BaseEvent {
      }

      /**
       * A `SockJS` connection. Like the WebSocket API, but `send()` reports
       * whether the message was accepted and a `drain` event signals that a
       * full write buffer has been flushed.
       */
      interface Socket extends WebSocket {
          /**
           * Returns `true` when the message was accepted by the transport, and
           * `false` when it was not.
           *
           * A `false` means either that the connection is not open
           * (`readyState` is `CLOSING` or `CLOSED`), in which case no `drain`
           * event will ever be dispatched, or that the transport is applying
           * backpressure, in which case a `drain` event is dispatched once more
           * data can be accepted. Both cases have to be handled by the caller:
           * resume on `drain` and abort on `close`.
           *
           * Only the Node `websocket` transport reports backpressure today;
           * every other transport returns `true` unconditionally, which means
           * "accepted", not "delivered".
           */
          send(data: string | ArrayBufferLike | Blob | ArrayBufferView): boolean;
          ondrain: ((event: DrainEvent) => any) | null;
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
