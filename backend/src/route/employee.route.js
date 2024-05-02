import express from "express";
import { addEmployeeReport, deleteEmployeeReport, getEmployeeReports, updateEmployeeReport } from "../controller/employee.controller.js";

const employeeRoutes = express.Router();

employeeRoutes.route('/')
.post(addEmployeeReport)

employeeRoutes.route('/:id')
.get(getEmployeeReports)
.delete(deleteEmployeeReport)
.put(updateEmployeeReport)


export default employeeRoutes;