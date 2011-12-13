exports.config = {
    client_opts: {
        // Address of a sockjs test server.
        url: 'http://localhost:8081',
        disabled_transports: [],
        sockjs_opts: {devel:true, debug:true}
    },

    port: 8080,
    host: '0.0.0.0'
};
