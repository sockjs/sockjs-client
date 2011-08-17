exports.config = {
    opts: {
        sockjs_url: "/lib/sockjs.js"
    },
    port: 8080,
    host: '0.0.0.0',

    // May be set to empty string if you don't need to test
    // cross-domain features.
    sockjs_endpoint_url: 'http://localhost:8080'
};
