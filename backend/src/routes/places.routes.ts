import express from "express";
import { check } from "express-validator";
import fileUpload from "../middleware/file-upload";

import {
  getPlaceById,
  getPlacesByCreatorId,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/places.controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByCreatorId);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").notEmpty(),
  ],
  createPlace
);

router.patch(
  "/:pid",
  [check("title").notEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);

router.delete("/:pid", deletePlace);

export default router;
