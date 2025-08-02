import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/lib/actions/auth";
import { getAvatarColor } from "@/lib/utils";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching orders:', error);
    // You might want to show an error message to the user
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className={`${getAvatarColor(user.email ?? '')} text-4xl`}>
                  {user.email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user.email}</CardTitle>
              <CardDescription>Customer</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <form action={signOut}>
                <Button variant="outline" className="w-full">Sign Out</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Check the status of recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders && orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={order.status === "Delivered" ? "default" : "destructive"}
                            className={`${order.status === "Delivered" ? "bg-green-500" : "bg-red-500"}`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">₦{order.total.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        You have no orders yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}