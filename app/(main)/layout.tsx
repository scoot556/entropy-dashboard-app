import { Navigation } from "@/components/navigation/navigation";

const MainLayout = async({ children }: {children: React.ReactNode;}) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-64 z-30 flex-col fixed inset-y-0">
                <Navigation />
            </div>
            <main className="md:pl-64 h-full">
                {children}
            </main>
        </div>
    )
}

export default MainLayout;