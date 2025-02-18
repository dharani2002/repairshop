import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function LoginPage(){
    return (
        <main className="h-dvh flex flex-col items-centergap-6 text-4xl p-4">
            <h1>Repair shop</h1>
            <Button asChild>
                <LoginLink>Sign In</LoginLink>
            </Button>

        </main>
    )
}