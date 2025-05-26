import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const UsersManagementPage = () => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">ユーザ管理</CardTitle>
        <CardDescription>登録されているユーザを確認・管理できます。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
      </CardContent>  
    </Card>
  )
}

export default UsersManagementPage