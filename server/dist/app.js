"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config({ path: './.env' }).parsed;
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
const uri = process.env.MONGO_URL;
// type connectOptions = {
//   useNewUrlParser: boolean
//   useUnifiedTopology: boolean
// }
// const options : ConnectOptions & connectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
mongoose_1.default.connect(uri)
    .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
    .catch((error) => {
    throw error;
});
