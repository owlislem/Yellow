const AboutUs = () => {
  return (
    <div
      className="bg-gray-v1 section-padding flex gap-[60px] overflow-hidden mb-[30px]"
      id="aboutUs"
    >
      <div className="flex-1 bg-gray-v3 flex flex-col gap-[10px] justify-end lg:justify-center p-[20px] md:p-[30px] mb-[20px] rounded-b-[30px]">
        <h1 className="hidden md:block h3-extrabold md:h2-extrabold lg:h1-extrabold text-yellow-primary capitalize tracking-[2px] md:tracking-[4px] lg:tracking-[6px]">
          about us
        </h1>
        <h2 className="block body-medium md:base-medium lg:h3-medium font-Sriracha md:font-roboto">
          let`s discover algeria together
        </h2>
        <div>
          <p className="paragraph-sizing text-gray-p font-Sriracha md:font-roboto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            con Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatu
          </p>
        </div>
      </div>
      <div className="hidden md:block flex-1 translate-y-[30px] lg:translate-y-[50px] rounded-tl-[30px] rounded-tr-[30px] overflow-hidden">
        <img
          src="/assets/aboutUs.svg"
          className="max-w-full max-h-full aspect-[513/599] w-full h-full"
        />
      </div>
    </div>
  );
};

export default AboutUs;
