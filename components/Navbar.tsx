import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, LogOut } from "lucide-react";


const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/Logo.svg" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="flex items-center">
                <span className="max-sm:hidden login">Create</span>
                <Plus className="sm:hidden size-6" />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="flex items-center" suppressHydrationWarning>
                  <span className="max-sm:hidden login">Logout</span>
                  <LogOut className="sm:hidden size-6" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar>
                  <AvatarImage src={session?.user?.image || "/Logo.svg"} alt={session?.user?.name || "User"} />
                  <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("google");
              }}  
            >
              <button type="submit" className="login">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;