exports.config = {
    client_opts: {
        // Address of a sockjs test server.
        url: 'http://localhost:8081',
        disabled_transports: [],
        sockjs_opts: {
            devel:true,
            debug:true,
            info: {websocket:true, cookie_need:false}
        }
    },

    port: 8080,
    host: '0.0.0.0'
};
