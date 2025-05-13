'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneralExpenseTab } from './GeneralExpenseTab';
import { TransportationTab } from './TransportationTab';

export function ExpenseRequestForm() {
  const [activeTab, setActiveTab] = useState('general');
  return (
    <Card className="shadow-lg border-0s">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">経費申請フォーム</CardTitle>
        <CardDescription>交通費や会社の経費を申請するためのフォームです。</CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardContent className="pt-2">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="general" className="cursor-pointer">一般経費</TabsTrigger>
            <TabsTrigger value="transportation" className="cursor-pointer">交通費</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralExpenseTab />
          </TabsContent>

          <TabsContent value="transportation">
            <TransportationTab /> 
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
