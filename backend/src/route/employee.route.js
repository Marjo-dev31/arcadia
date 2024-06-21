import express from "express";
import { addEmployeeReport, deleteEmployeeReport, getEmployeeReportsByAnimal, updateEmployeeReport } from "../controller/employee.controller.js";
import authenticateToken from "../middleware/auth.js";
import verifyRoles from "../middleware/verifyroles.js";

const employeeRoutes = express.Router();

employeeRoutes.route('/')
.post(authenticateToken, verifyRoles('Employé'), addEmployeeReport)

employeeRoutes.route('/:id')
.get(getEmployeeReportsByAnimal)
.delete(authenticateToken, verifyRoles('Employé'), deleteEmployeeReport)
.put(authenticateToken, verifyRoles('Employé'), updateEmployeeReport)


export default employeeRoutes;