import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseType } from '@/features/expense/history/type/expenseType';
import TransportationEditContainer from './TransportationEditContainer';
import { GeneralExpenseForm } from '../../components/GeneralExpenseForm';

type ExpenseRequestEditPageProps = {
  expense: ExpenseType | undefined;
};

const ExpenseRequestEditPage = ({ expense }: ExpenseRequestEditPageProps) => {
  const type = 'edit';
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">経費編集フォーム</CardTitle>
        <CardDescription>交通費や一般経費の情報を編集するためのフォームです。</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {expense?.expenseType === 'General' ? (
          <GeneralExpenseForm type={type} expense={expense} />
        ) : (
          <TransportationEditContainer type={type} expense={expense} />
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseRequestEditPage;
