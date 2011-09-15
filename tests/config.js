exports.config = {
    opts: {
        sockjs_url: "/lib/sockjs.js"
    },
    port: process.env.PORT || 8080,
    host: '0.0.0.0',

    client_opts: {
        // May be set to empty string if you don't need to test
        // cross-domain features. In other case set it to a full
        // url, like: "http://localhost:8080"
        disabled_transports: [],
        url: '',
        sockjs_opts: {devel:true}
    }
};
