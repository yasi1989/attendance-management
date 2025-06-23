import ExpenseRequestEditPage from "@/features/expense/edit/components/ExpenseRequestEditPage";
import { fetchExpenseById } from "@/features/expense/services/fetchExpense";

const EditExpensePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const expense = fetchExpenseById(id);

  return <ExpenseRequestEditPage expense={expense} />;
};

export default EditExpensePage;
