import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo-modern.svg"
                        alt="logo"
                        width={46}
                        height={44}
                        loading="eager"
                        className="hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-lg text-primary">Intellilearn</span>
                        <span className="text-xs text-muted-foreground -mt-1">Learning Companion</span>
                    </div>
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar
