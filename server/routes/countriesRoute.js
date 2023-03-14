import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.get("/", indexCtrl.CountriesCtrl.findAll);
router.get("/:id", indexCtrl.CountriesCtrl.findOne);
router.post("/", indexCtrl.CountriesCtrl.create);
router.put("/:id", indexCtrl.CountriesCtrl.update);
router.delete("/:id", indexCtrl.CountriesCtrl.deleted);

router.get("/sql/:id", indexCtrl.CountriesCtrl.querySQL);

export default router;
