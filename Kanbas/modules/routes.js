import db from "../Database/index.js";
import {getRandomInt} from "../courses/routes.js";
import * as dao from "./dao.js";
import {findModuleByCourseNumber, findModuleById} from "./dao.js";
export default function ModuleRoutes(app) {
    const createModule = async (req, res) => {
        const {courseNumber} = req.params;
        const newModule = {
          ...req.body,
            course: courseNumber,
            module_number: "M" + getRandomInt(200, 999).toString()
        };
        const module = await dao.createModule(newModule);
        res.json(module);
    };
    app.post("/api/courses/:courseNumber/modules", createModule);

    const findModuleById = async (req, res) => {
        const {moduleId} = req.params;
        const module = await dao.findModuleById(moduleId);
        res.json(module);
    };
    app.get("/api/modules/:moduleId", findModuleById);

    const deleteModule = async (req, res) => {
        const {moduleId} = req.params;
        const status = await dao.deleteModule(moduleId);
        res.json(status);
    };
    app.delete("/api/modules/:moduleId",deleteModule);

    const updateModule = async (req, res) => {
        const {moduleId} = req.params;
        const status = await dao.updateModule(moduleId, req.body);
        const currentModule = await dao.findModuleById(moduleId);
        res.json(status);
    };
    app.put("/api/modules/:moduleId", updateModule);

    const findModuleByCourseNumber = async (req, res) => {
        const { courseNumber } = req.params;
        const modules = await dao.findModuleByCourseNumber(courseNumber);
        res.json(modules);
    };
    app.get("/api/courses/:courseNumber/modules", findModuleByCourseNumber);



}



//     app.put("/api/modules/:mid", (req, res) => {
//         const { mid } = req.params;
//         const moduleIndex = db.modules.findIndex(
//             (m) => m._id === mid);
//         db.modules[moduleIndex] = {
//             ...db.modules[moduleIndex],
//             ...req.body
//         };
//         res.sendStatus(204);
//     });
//
//     app.delete("/api/modules/:mid", (req, res) => {
//         const {mid} = req.params;
//         db.modules = db.modules.filter((m) => m._id !== mid);
//         res.sendStatus(200);
//     });
//
//     app.post("/api/courses/:cid/modules", (req, res) => {
//         const { cid } = req.params;
//         const newModule = {
//             ...req.body,
//             course: cid,
//             _id: "M" + getRandomInt(200, 999).toString(),
//         };
//         db.modules.push(newModule);
//         res.send(newModule);
//     });
//     app.get("/api/courses/:cid/modules", (req, res) => {
//         const { cid } = req.params;
//         const modules = db.modules
//             .filter((m) => m.course === cid);
//         res.send(modules);
//     });
// }

