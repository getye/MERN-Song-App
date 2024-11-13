"use strict";
// routes/songRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songController_1 = require("../controllers/songController");
const router = (0, express_1.Router)();
router.post('/addsong', songController_1.createSong);
router.get('/viewsongs', songController_1.viewSongs);
router.put('/updatesong/:id', songController_1.updateSong);
router.delete('/songs/:id', songController_1.deleteSong);
exports.default = router;
