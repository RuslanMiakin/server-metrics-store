module.exports = {
    apps : [{
        name: "server-metrics-store",
        script: "dist/app.js",
        instances: "max",
        exec_mode: "cluster",
        env: {
            NODE_ENV: "production",
        },
    }]
}
