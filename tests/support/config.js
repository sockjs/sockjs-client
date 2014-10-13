exports.config = {
    client_opts: {
        // Address of a sockjs test server.
        url: 'http://localhost:8081',
        sockjs_opts: {
            devel: true,
            debug: true,
            // websocket:false
            info: {cookie_needed:false}
        }
    },

    port: 8080,
    host: '0.0.0.0'
};
