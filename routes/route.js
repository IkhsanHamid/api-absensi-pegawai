import { Router } from "express"
import absenController from "../controller/absen.controller.js"

const router = Router()

router.get('/get', absenController.findAll)
router.post('/post', absenController.create)
router.put("/update/:absenId", absenController.update);
router.get("/findOne/:absenId", absenController.findOne);
router.delete("/deleted/:absenId", absenController.deleted);
router.get("/findLate/:bulan", absenController.findLateCount);
router.get("/findAbsen/:bulan", absenController.findAbsenCount);
router.get("/findCuti/:bulan", absenController.findCutiCount);
router.get("/findApprove/:bulan", absenController.findApprove);
router.get("/findNotApprove/:bulan", absenController.findNotApprove);
router.get("/findWaitApprove/:bulan", absenController.findWaitApprove);
router.get("/findByDateAndType/:tgl_absen/:jenis_absen", absenController.findByDateAndType);


export default router