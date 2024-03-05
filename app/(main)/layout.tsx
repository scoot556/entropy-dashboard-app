import { Navigation } from "@/components/navigation/navigation";

const MainLayout = async({ children }: {children: React.ReactNode;}) => {
    return (
        <div className="min-h-screen min-w-fit">
            <Navigation />
            <main className="md:pl-64 h-full">
                {children}
            </main>
        </div>
    )
}

export default MainLayout;