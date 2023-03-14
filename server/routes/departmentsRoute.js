import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.get("/", indexCtrl.DepartmentsCtrl.findAll);
router.get("/:id", indexCtrl.DepartmentsCtrl.findOne);
router.post("/", indexCtrl.DepartmentsCtrl.create);
router.put("/:id", indexCtrl.DepartmentsCtrl.update);
router.delete("/:id", indexCtrl.DepartmentsCtrl.deleted);

router.get("/sql/:id", indexCtrl.DepartmentsCtrl.querySQL);
export default router;
