import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: "Головна", href: "/" },
    { name: "Про систему", href: "/about" },
    { name: "Особливості", href: "/features" },
    { name: "Розробник", href: "/developer" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold cursor-pointer">Nexus OS</span>
              </Link>
              <div className="hidden md:flex ml-10 space-x-4">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium cursor-pointer",
                        location === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <span><Button variant="secondary">Кабінет</Button></span>
                </Link>
              ) : (
                <Link href="/auth">
                  <span><Button>Розпочати</Button></span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
