import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "../components/Slider";
import Reservation from "../components/Reservation";
import Overview from "../components/Overview";
import Info from "../components/Info";
import Program from "../components/Program";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { nextDestinations } from "../components";

export default function LastTrip() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const ourDestination = nextDestinations.filter((nextDestination) => {
      return nextDestination.id === +id;
    });
    setDestination(ourDestination[0]);
  }, [id]);
  // 7ta nkemlou l admin dashboard bah nriglou l fonction mli7, lfetc
  // useEffect(() => {
  //   const fetchDestination = async () => {
  //     try {
  //       const response = await fetch(`/api/v1/destinations/${name}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch destination");
  //       }
  //       const destinationData = await response.json();
  //       setDestination(destinationData);
  //     } catch (error) {
  //       console.error("Error fetching destination:", error);
  //     }
  //   };

  //   fetchDestination();
  // }, [name]);

  // setDestination(ourDestination);

  if (!destination) {
    return (
      <div className="pt-[70px] md:pt-[80px] lg:pt-[90px] px-[15px] md:-[30px] lg:px-[70px]">
        Loading destination...
      </div>
    );
  } else {
    return (
      <div className="pt-[70px] md:pt-[80px] lg:pt-[90px] bg-gray-v1 min-h-[100vh]">
        <Slider imageUrls={destination.imageUrls} />
        <Reservation destination={destination} />
        <Overview
          overview={destination.overview}
          important={destination.important}
        />
        <Info
          departureTime={destination.departureTime}
          returnTime={destination.returnTime}
          departurePlace={destination.departurePlace}
          dressCode={destination.dressCode}
          included={destination.included}
        />
        <Program program={destination.program} />
        <Contact />
        <Footer />
      </div>
    );
  }
}
