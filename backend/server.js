"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const songRoutes_1 = __importDefault(require("./routes/songRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//app.use(cors());
app.use((0, cors_1.default)({
    origin: 'https://inquisitive-griffin-a97ff5.netlify.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.use('/', songRoutes_1.default);
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
