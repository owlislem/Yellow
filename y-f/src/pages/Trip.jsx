import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "../components/Slider";
import Reservation from "../components/Reservation";
import Overview from "../components/Overview";
import Info from "../components/Info";
import Program from "../components/Program";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { getTour } from "../features/tour/tourSlice";

export default function Trip() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  const dispatch = useDispatch();

  // const [tripDetails, setTripDetails] = useState(null);

  // useEffect(() => {
  //   axios.get(/api/trips/${id})
  //     .then(response => {
  //       setTripDetails(response.data);
  //     })
  //     .catch(error => {
  //       console.error("There was an error fetching the trip details!", error);
  //     });
  // }, [id]);

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getTour(id));
      console.log(payload);
      setDestination(payload.tour);
    })();
  }, []);

  if (!destination) {
    return (
      <div className="pt-[70px] md:pt-[80px] lg:pt-[90px] px-[15px] md:-[30px] lg:px-[70px]">
        Loading destination...
      </div>
    );
  } else {
    return (
      <div className="pt-[70px] md:pt-[80px] lg:pt-[90px] bg-gray-v1 min-h-[100vh]">
        <Slider imageUrls={destination.Image} />
        <Reservation destination={destination} />
        <Overview overview={destination.Destination} />
        <Info
          departureTime={destination.DepartureTime}
          returnTime={destination.ReturnTime}
          departurePlace={destination.DeparturePlace}
          dressCode={destination.DressCode}
          included={destination.Includes}
        />
        <Program program={destination.Program} />
        <Contact />
        <Footer />
      </div>
    );
  }
}
