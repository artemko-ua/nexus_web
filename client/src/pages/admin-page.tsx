import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Users, Database } from "lucide-react";
import { Redirect } from "wouter";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function AdminPage() {
  const { user } = useAuth();

  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const { data: activeUsers, isLoading: isLoadingActive } = useQuery<number>({
    queryKey: ["/api/admin/active-users"],
    refetchInterval: 5000, // Оновлюємо кожні 5 секунд
  });

  async function makeAdmin() {
    try {
      const response = await fetch('/api/admin/first-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.message || 'Помилка при отриманні прав адміністратора');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Сталася помилка при спробі отримати права адміністратора');
    }
  }

  if (!user?.isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto p-4 max-w-4xl">
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Доступ заборонено</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Ви не маєте прав адміністратора для доступу до цієї сторінки.</p>
              <button 
                onClick={makeAdmin}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded"
              >
                Отримати права адміністратора
              </button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (isLoadingUsers || isLoadingActive) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Активні користувачі
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{activeUsers}</div>
              <p className="text-muted-foreground">користувачів онлайн</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6" />
                База користувачів
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Список всіх зареєстрованих користувачів системи</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Ім'я користувача</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>IP-адреса</TableHead>
                    <TableHead>Адмін</TableHead>
                    <TableHead>Дата реєстрації</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.registrationIp}</TableCell>
                      <TableCell>{user.isAdmin ? 'Так' : 'Ні'}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleString('uk-UA')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
}