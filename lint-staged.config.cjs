module.exports = {
    "{apps,libs,tools}/**/*.{ts,tsx}": (files) => {
        return `nx affected --target=lint --files=${files.join(",")}`;
    },
    "{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}": [
        (files) => `nx affected:lint --files=${files.join(",")}`,
        (files) => `nx format:write --files=${files.join(",")}`,
        // (files) => `nx affected --target=build --files=${files.join(",")}`,
    ],
};
