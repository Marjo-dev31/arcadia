import express from "express";
import { addEmployeeReport, getEmployeeReports } from "../controller/employee.controller.js";

const employeeRoutes = express.Router();

employeeRoutes.route('/')
.post(addEmployeeReport)

employeeRoutes.route('/:id')
.get(getEmployeeReports)


export default employeeRoutes;