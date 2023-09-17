import { Router } from "express";
import * as SnipperController from "../controllers/SnippetController.js";

const router = new Router();

router.get('/snippets', SnipperController.getSnippetsWithPagination);
router.get('/snippets/:id', SnipperController.getSnippetById);
router.post('/snippets', SnipperController.createSnippet);


export default router;