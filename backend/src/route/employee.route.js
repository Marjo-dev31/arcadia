import express from "express";
import { getEmployeeReports } from "../controller/employee.controller.js";

const employeeRoutes = express.Router();

employeeRoutes.route('/')
.get(getEmployeeReports)


export default employeeRoutes;