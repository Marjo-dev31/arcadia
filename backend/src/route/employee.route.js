import express from "express";
import { addEmployeeReport, deleteEmployeeReport, getEmployeeReports } from "../controller/employee.controller.js";

const employeeRoutes = express.Router();

employeeRoutes.route('/')
.post(addEmployeeReport)

employeeRoutes.route('/:id')
.get(getEmployeeReports)
.delete(deleteEmployeeReport)


export default employeeRoutes;