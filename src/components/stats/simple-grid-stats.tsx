const SimpleGridStats = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-semibold lg:text-6xl font-[var(--font-display)] text-foreground">
          Empowering Wellness Worldwide
        </h1>
        <div className="grid gap-10 pt-9 md:grid-cols-3 lg:gap-0 lg:pt-20">
          <div className="text-center">
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-primary">50,000+</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              Women Empowered
            </p>
          </div>
          <div className="text-center">
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-primary">94%</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              Report Improved Energy
            </p>
          </div>
          <div className="text-center">
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-primary">4.9/5</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              Customer Satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SimpleGridStats };