import { useParams } from "react-router-dom";
import { experiences } from ".";
import ExperienceSlider from "./ExperienceSlider";
import { useEffect, useState } from "react";
import TopTripHighlights from "./TopTripHighlights";
import TopTripInfos from "./TopTripInfos";
import Footer from "./Footer";
import TopTripExplore from "./TopTripExplore";
import TopTripGallery from "./TopTripGallery";
import TopTripReviews from "./TopTripReviews";
const TopTrip = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    const ourexperience = experiences.filter((experience) => {
      return experience.id === +id;
    });
    setExperience(ourexperience[0]);
  }, [id]);
  if (!experience) {
    return (
      <div className="pt-[70px] md:pt-[80px] lg:pt-[90px] px-[15px] md:-[30px] lg:px-[70px]">
        Loading experience...
      </div>
    );
  } else {
    return (
      <div className="bg-gray-v1">
        <div className="relative">
          <ExperienceSlider imageUrls={experience.imageUrls} />
          <h1 className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h1-semibold z-10 uppercase text-white font-roboto">
            {experience.title}
          </h1>
        </div>
        <TopTripInfos
          travelersNumber={experience.travelersNumber}
          reviewsNumber={experience.reviewsNumber}
          rating={experience.rating}
          distance={experience.distance}
        />
        <TopTripHighlights highlights={experience.highlights} />
        <TopTripGallery gallery={experience.gallery} />
        <TopTripExplore />
        <TopTripReviews />
        <Footer />
      </div>
    );
  }
};

export default TopTrip;
