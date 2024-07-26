import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" className="text-[0.5rem]">
                    Privacy Policy
                </Button>
                <Button variant="ghost" className="text-[0.5rem]">
                    Terms & Conditions
                </Button>

            </div>
        </div>
    )
}