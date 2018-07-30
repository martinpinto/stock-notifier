export const config = () => {
    const toml = require('toml-require').install();
    // parse toml main configuration file at ./config/default.toml
    return require('./config.toml')();
};