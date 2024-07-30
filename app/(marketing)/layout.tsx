import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
    children
}:{
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full x-full">
            <Navbar />
            <main className="h-full w-full pt-10">
                {children}
            </main>

        </div>
    );
}

export default MarketingLayout;