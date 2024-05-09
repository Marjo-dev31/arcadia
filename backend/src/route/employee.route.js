import express from "express";
import { addEmployeeReport, deleteEmployeeReport, getEmployeeReports, updateEmployeeReport } from "../controller/employee.controller.js";
import authenticateToken from "../middleware/auth.js";

const employeeRoutes = express.Router();

employeeRoutes.route('/')
.post(authenticateToken, addEmployeeReport)

employeeRoutes.route('/:id')
.get(getEmployeeReports)
.delete(authenticateToken, deleteEmployeeReport)
.put(authenticateToken, updateEmployeeReport)


export default employeeRoutes;