const JoinUs = () => {
  return (
    <div className="bg-cover bg-center joinUs flex flex-col gap-[20px] md:gap-[40px] section-padding py-[30px] md:py-[80px] h-[550px]">
      <h1 className="h3-semibold md:h2-semibold lg:h1-bold capitalize">
        yellow <span className="inline-block text-yellow-primary">family</span>
      </h1>
      <p className="paragraph-sizing max-w-[60%] text-gray-p">
        Ready for adventure? Join the Yellow Family and explore Algeria`s
        stunning nature! From mountains to deserts, our trips offer
        unforgettable experiences for everyone. Sign up now and let the
        adventure begin!
      </p>
      <button className="main-button w-fit">Join Us</button>
    </div>
  );
};

export default JoinUs;
