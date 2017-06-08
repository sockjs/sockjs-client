/**
 * Created by RAPertsev on 08.06.2017.
 */

export declare class SockJS {
    onopen: Function;
    onmessage: Function;
    onclose: Function;

    constructor(url: string);

    send(message: string): void;
    close(): void;
}