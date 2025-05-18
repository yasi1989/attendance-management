import { DataTable } from "@/components/DataTable"
import { expenseColumns } from "./ExpenseColumns"
import { expenseData } from "../const/mockData"
import { filterExpenseColumns } from "../const/filterExpenseColumns"

const ExpenseHistoryTable = () => {
  return (
    <DataTable columns={expenseColumns} data={expenseData} filterableColumns={filterExpenseColumns}/>
  )
}

export default ExpenseHistoryTable