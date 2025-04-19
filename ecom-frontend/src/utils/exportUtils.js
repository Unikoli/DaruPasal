// src/utils/exportUtils.js
import jsPDF from "jspdf";
import "jspdf-autotable"; // important: this attaches autoTable to jsPDF
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportOrdersToPDF = (orders) => {
  const doc = new jsPDF();

  doc.text("Orders Report", 14, 15);

  const tableData = orders.map((order, index) => [
    index + 1,
    order.id,
    order.user?.name || "",
    order.status,
    order.items.map((i) => i.product.name).join(", "),
  ]);

  doc.autoTable({
    head: [["#", "Order ID", "User", "Status", "Products"]],
    body: tableData,
    startY: 20,
  });

  doc.save("orders.pdf");
};

export const exportOrdersToExcel = (orders) => {
  const worksheetData = orders.map((order) => ({
    "Order ID": order.id,
    "User": order.user?.name || "",
    "Status": order.status,
    "Products": order.items.map((i) => i.product.name).join(", "),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "orders.xlsx");
};
