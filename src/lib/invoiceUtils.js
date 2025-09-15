// src/lib/invoiceUtils.js
export function buildFixedInvoiceDates() {
  const today = new Date();

  // Decide invoice month: this month if before or on 3rd, else next month
  let invoiceDate = new Date(today.getFullYear(), today.getMonth(), 3);
  if (today.getDate() > 3) {
    invoiceDate = new Date(today.getFullYear(), today.getMonth() + 1, 3);
  }

  const debitDate = new Date(invoiceDate.getFullYear(), invoiceDate.getMonth(), 5);
  const dueDate = debitDate;

  const fmt = (d) => d.toISOString().split("T")[0];
  return {
    invoice_date: fmt(invoiceDate),
    duedate: fmt(dueDate),
    debit_date: fmt(debitDate),
  };
}
