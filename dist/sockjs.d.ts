/**
 * Created by RAPertsev on 08.06.2017.
 */

export declare class SockJS {
    new(url: string): SockJS;

    onopen: Function;
    onclose: Function;
    onmessage: Function;

    send(message: string): void;
    close(): void;
}