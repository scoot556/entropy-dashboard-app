import { Navigation } from "@/components/navigation/navigation";

const MainLayout = async({ children }: {children: React.ReactNode;}) => {
    return (
        <div className="h-full">
            <Navigation />
            <main className="md:pl-64 h-full">
                {children}
            </main>
        </div>
    )
}

export default MainLayout;