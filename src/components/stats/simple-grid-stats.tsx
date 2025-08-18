const SimpleGridStats = () => {
  return (
    <section className="py-32 bg-[#F5F2EF]">
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-semibold lg:text-6xl font-serif text-[#4A235A]">
          Empowering Wellness Worldwide
        </h1>
        <div className="grid gap-10 pt-9 md:grid-cols-3 lg:gap-0 lg:pt-20">
          <div className="text-center">
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-[#4A235A]">50,000+</p>
            <p className="text-2xl font-semibold text-[#6B5B73]">
              Women Empowered
            </p>
          </div>
          <div className="text-center">
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-[#4A235A]">94%</p>
            <p className="text-2xl font-semibold text-[#6B5B73]">
              Report Improved Energy
            </p>
          </div>
          <div className="text-center">
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-[#4A235A]">4.9/5</p>
            <p className="text-2xl font-semibold text-[#6B5B73]">
              Customer Satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SimpleGridStats };