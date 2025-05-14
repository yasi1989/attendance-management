import { DataTable } from "@/components/DataTable"
import { expenseColumns } from "./ExpenseColumns"
import { expenseData } from "../const/mockData"

const ExpenseHistoryTable = () => {
  return (
    <DataTable columns={expenseColumns} data={expenseData} />
  )
}

export default ExpenseHistoryTable