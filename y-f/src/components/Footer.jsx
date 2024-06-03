const Footer = () => {
  return (
    <div className="footer">
      <div className="flex flex-col items-center m-auto md:m-0 w-[300px]">
        <img
          src="/assets/footerLogo.svg"
          alt="footer-image"
          className="ml-[40px]"
        />
        <p className="nano-regular w-[210px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,consectetur
          adipiscing elit.
        </p>
      </div>

      <div className="links">
        <h3 className="h3-semibold capitalize">quick links</h3>
        <ul>
          <li>home</li>
          <li>about us</li>
          <li>distinations</li>
          <li>reviews</li>
        </ul>
      </div>
      <div className="links">
        <h3 className="h3-semibold capitalize ">explore</h3>
        <ul>
          <li>sahara</li>
          <li>plages</li>
          <li>foret</li>
          <li>montagne</li>
        </ul>
      </div>
      <div className="links">
        <h3 className="h3-semibold capitalize">contact us</h3>
        <ul>
          <li>(406) 555-0120</li>
          <li>(406) 555-0120</li>
          <li>deanna.curtis@example.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
