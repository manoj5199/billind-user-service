"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.connect = void 0;
const mongodb_1 = require("mongodb");
const mongoUri = process.env.DB_URI || "mongodb://localhost:27017/";
const databaseName = process.env.DB_NAME || "user-register";
let client = new mongodb_1.MongoClient(mongoUri);
let db;
client.on("connection", () => {
    console.log(`Database connected successfully`);
});
client.on("connection", () => {
    console.log(`Database connected successfully`);
});
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    client = yield client.connect();
    exports.db = db = client.db(databaseName);
});
exports.connect = connect;
