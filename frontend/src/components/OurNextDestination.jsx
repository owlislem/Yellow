import { nextDestinations } from "./index";
import DestinationCard from "./DestinationCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTours } from "../features/tour/tourSlice";
import { useEffect, useState } from "react";
const OurNextDestination = () => {
  const dispatch = useDispatch();
  const [nextDestinations, setNextDestinations] = useState([]);
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getTours());
      setNextDestinations(payload.tours);
    })();
  }, []);

  return (
    <div className="mb-[40px]">
      <div className="section-padding">
        <h1 className="h3-medium lg:h2-medium">Our Next Destination</h1>
        <p className="small-regular md:body-regular mb-[40px] gray-p">
          Explore this week`s destination :Book now for an unforgettable
          experience!
        </p>
      </div>
      <div className="flex gap-[20px] md:gap-[40px] scroll px-[10px] md:px-[30px] lg:px-[70px] pb-[20px]">
        {nextDestinations.map((destination) => {
          return (
            <Link to={`/destinations/${destination._id}`} key={destination._id}>
              <DestinationCard
                image={destination.Image[0]}
                price={destination.Price}
                destination={destination.Destination}
                departureDate={destination.DepartureDate}
                returneDate={destination.ReturneDate}
                createdAt={destination.createdAt}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OurNextDestination;
