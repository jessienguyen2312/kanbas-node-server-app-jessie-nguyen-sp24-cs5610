import * as dao from "./dao.js";

export function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
export default function CourseRoutes(app) {
    const createCourse = async (req, res) => {
        const newCourse = {
            ...req.body,
            course_number: "LI" + getRandomInt(1010, 9999).toString()
        };
        const course = await dao.createCourse(newCourse);
        res.json(course);
    };
    app.post("/api/courses", createCourse);

    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    };
    app.get("/api/courses", findAllCourses);

    const deleteCourse = async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.json(status);
    };
    app.delete("/api/courses/:courseId", deleteCourse);


    const findCourseById = async (req, res) => {
        const { courseId } = req.params;
        const course = await dao.findCourseById(courseId);
        res.json(course);
    };
    app.get("/api/courses/:courseId", findCourseById);

    const updateCourse = async (req, res) => {
        const {courseId} = req.params;
        const status = await dao.updateCourse(courseId, req.body);
        const currentCourse = await dao.findCourseById(courseId);
        res.json(status);
    };
    app.put("/api/courses/:courseId", updateCourse);

}





// old stuff from A5
//     app.get("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         const course = Database.courses
//             .find((c) => c._id === id);
//         if (!course) {
//             res.status(404).send("Course not found");
//             return;
//         }
//         res.send(course);
//     });
//
//     app.put("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         const course = req.body;
//         Database.courses = Database.courses.map((c) =>
//             c._id === id ? { ...c, ...course } : c
//         );
//         res.sendStatus(204);
//     });
//
//     app.delete("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         Database.courses = Database.courses
//             .filter((c) => c._id !== id);
//         res.sendStatus(204);
//     });
//
//     app.post("/api/courses", (req, res) => {
//         const newCourse = {
//             ...req.body,
//             course_number: "LI" + getRandomInt(1010, 9999).toString()};
//         Database.courses.push(newCourse);
//         res.send(newCourse);
//     });
//
//     app.get("/api/courses", (req, res) => {
//         const courses = Database.courses;
//         res.send(courses);
//     });
