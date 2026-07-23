const Quote = () => {
  return (
    <div className="quote">
      <div className="hidden lg:flex gap-[20px] flex-1 items-start justify-center">
        <div className="common-radius overflow-hidden">
          <img
            src="/assets/footerLeft.png"
            className="w-[290px] min-w-full aspect-[299/347] common-radius max-w-full"
          />
        </div>
        <div>
          <img
            src="/assets/footerRight1.svg"
            className="max-w-[290] w-[290] aspect-[310/242] mb-[20px] h-full common-radius"
          />
          <img
            src="/assets/footerRight2.svg "
            className="max-w-[290] w-[290] aspect-[310/347] common-radius"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-[20px] md:gap-[30px] lg:gap-[40px] text-center leading-[32px] capitalize">
        <img
          src="/assets/quote.svg"
          className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]"
        />
        <p className="max-w-[80%]">
          “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore “
        </p>
        <p className="max-w-[80%]">
          “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore “
        </p>
      </div>
    </div>
  );
};

export default Quote;
