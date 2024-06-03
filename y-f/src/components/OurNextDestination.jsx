import { nextDestinations } from "./index";
import DestinationCard from "./DestinationCard";
import { Link } from "react-router-dom";
const OurNextDestination = () => {
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
            <Link to={`/destinations/${destination.id}`} key={destination.id}>
              <DestinationCard
                cardImageUrl={destination.cardImageUrl}
                date={destination.date}
                price={destination.price}
                title={destination.title}
                duration={destination.duration}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OurNextDestination;
