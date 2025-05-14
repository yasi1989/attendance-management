import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ExpenseHistoryTable from './ExpenseTable';

const ExpenseHistory = () => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">経費申請履歴</CardTitle>
        <CardDescription>交通費や一般経費の申請状態を確認できます。</CardDescription>
      </CardHeader>
      <CardContent>
        <ExpenseHistoryTable />
      </CardContent>
    </Card>
  );
};

export default ExpenseHistory;
