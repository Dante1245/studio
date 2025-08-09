export function Stats() {
    const stats = [
        { value: '$10B+', label: 'Trading Volume' },
        { value: '100+', label: 'Assets Supported' },
        { value: '50k+', label: 'Active Traders' },
        { value: '99.9%', label: 'Uptime' }
    ]

    return (
        <section id="stats" className="py-12 sm:py-16">
            <div className="container">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 text-center md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col">
                            <h3 className="text-4xl font-bold tracking-tight text-primary">{stat.value}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
