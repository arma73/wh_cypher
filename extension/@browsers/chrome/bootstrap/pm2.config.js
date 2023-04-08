module.exports = {
    apps: [
        {
            name: "Webpack",
            script: "wext dev",
            ignore_watch: ["."],
            env: {
                NODE_ENV: process.env.NODE_ENV ?? "development",
            },
        },
        {
            name: "Postcss",
            script: "postcss assets/styles/**/*.css --base assets/styles --dir src/styles",
            autorestart: false,
            watch: [
                "./tailwind.config.js",
                "./src/**/*.tsx",
                "./src/**/*.html",
                "./assets/styles/**/*.css",
                "../../../packages/@shared/ui/lib/**/*.+(js|jsx|ts|tsx)",
            ],
            env: {
                NODE_ENV: process.env.NODE_ENV ?? "development",
            },
        },
    ],
};
