'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { GeneralExpenseTab } from './GeneralExpenseTab';
import { TransportationTab } from './TransportationTab';
import { ExpenseFormSchema } from '@/lib/formSchema';

export function ExpenseRequestForm() {
  const [activeTab, setActiveTab] = useState('basic');

  const form = useForm<z.infer<typeof ExpenseFormSchema>>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues: {
      requestDate: new Date(),
      amount: 0,
      description: '',
      receiptUrl: '',
      routes: [{ from: '', to: '', fare: 0 }],
    },
    mode: 'onChange',
  });

  async function onSubmit(data: z.infer<typeof ExpenseFormSchema>) {
    console.log(data);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="shadow-lg border-0s">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="text-xl">経費申請フォーム</CardTitle>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <CardContent className="pt-6">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="basic">一般経費</TabsTrigger>
                  <TabsTrigger value="transportation">交通費</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-0">
                  <GeneralExpenseTab control={form.control} />
                </TabsContent>

                <TabsContent value="transportation" className="mt-0">
                  <TransportationTab />
                </TabsContent>
              </CardContent>
            </Tabs>

            <CardFooter className="flex justify-between border-t bg-muted/10 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                }}
              >
                リセット
              </Button>
              <Button type="submit" className="min-w-[100px]">
                申請
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </FormProvider>
  );
}
