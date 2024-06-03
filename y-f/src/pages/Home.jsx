import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import JoinUs from "../components/JoinUs";
import OurNextDestination from "../components/OurNextDestination";
import OurTopExperiences from "../components/OurTopExperiences";
import Quote from "../components/Quote";
import Reviews from "../components/Reviews";


function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <OurNextDestination />
      <JoinUs />
      <OurTopExperiences />
      <Reviews />
      <Quote />
      <Footer />
    </>
  );
}

export default Home;
