"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
const cors = (_, res, next) => {
    // Set the 'Access-Control-Allow-Origin' header to allow all origins ('*').
    // For a production environment, this should be a specific domain or list of domains.
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Set the 'Access-Control-Allow-Methods' header to specify the HTTP methods
    // that are allowed when accessing the resource.
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    // Set the 'Access-Control-Allow-Headers' header to indicate which headers
    // can be used during the actual request. This is crucial for pre-flight requests.
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    // Call next() to pass the request to the next middleware or route handler.
    next();
};
exports.cors = cors;
