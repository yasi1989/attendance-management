import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MonthlyAttendanceApprovalType } from '../type/monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalType } from '../type/monthlyExpenseApprovalType';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralExpenseForm from './GeneralExpenseForm';
import TransportationForm from './TransportationForm';
import { useState } from 'react';

type MonthlyApprovalFormProps = {
  status: 'Pending' | 'Approved';
  attendances: MonthlyAttendanceApprovalType[];
  expenses: MonthlyExpenseApprovalType[];
};

const MonthlyApprovalForm = ({ status, attendances, expenses }: MonthlyApprovalFormProps) => {
  const [activeTab, setActiveTab] = useState<string>('general');
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">{status === 'Pending' ? '承認待ち一覧' : '承認済み一覧'}</CardTitle>
        <CardDescription>
          {status === 'Pending' ? '承認待ちの月次申請を確認・管理できます。' : '承認済みの月次申請を確認できます。'}
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardContent className="pt-2">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="general" className="cursor-pointer">
              一般経費
            </TabsTrigger>
            <TabsTrigger value="transportation" className="cursor-pointer">
              交通費
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralExpenseForm type={type} />
          </TabsContent>

          <TabsContent value="transportation">
            <TransportationForm type={type} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default MonthlyApprovalForm;
