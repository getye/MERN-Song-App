"use strict";
// controllers/songController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSong = exports.updateSong = exports.viewSongs = exports.createSong = void 0;
const songModel_1 = __importDefault(require("../models/songModel"));
// Create a song
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const song = new songModel_1.default(req.body);
        yield song.save();
        res.send(song);
    }
    catch (error) {
        console.error('Error creating song:', error);
        res.status(500).send({ error: 'Failed to create song' });
    }
});
exports.createSong = createSong;
// Read all songs
const viewSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield songModel_1.default.find();
        res.send(songs);
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to fetch songs' });
    }
});
exports.viewSongs = viewSongs;
// Update a song
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const song = yield songModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!song) {
            return res.status(404).send({ error: 'Song not found' });
        }
        res.send(song);
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to update song' });
    }
});
exports.updateSong = updateSong;
// Delete a song
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const song = yield songModel_1.default.findByIdAndDelete(req.params.id);
        if (!song) {
            return res.status(404).send({ error: 'Song not found' });
        }
        res.send({ message: 'Song deleted' });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to delete song' });
    }
});
exports.deleteSong = deleteSong;
