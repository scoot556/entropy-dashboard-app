const PagesLayout = ({children}: {children: React.ReactNode;}) => {
    return (
        <div className="p-4 flex-1">
            {children}
        </div>
    )
}

export default PagesLayout;