import { Link } from "react-router-dom";
import Experience from "./Experience";
import { experiences } from "./index";
const OurTopExperiences = () => {
  return (
    <div className="bg-gray-v1 pt-[40px] pb-[20px]">
      <div className="section-padding">
        <h1 className="h3-medium lg:h2-medium capitalize">
          our top experiences
        </h1>
        <p className="text-gray-p small-regular md:body-regular">
          Discover our latest trips and the fun we had .
        </p>
      </div>

      <div className="flex items-center scroll gap-[10px] md:gap-[20px] px-[10px] md:px-[30px] h-[370px] md:h-[400px] lg:h-[480px]">
        {experiences.map((experience) => {
          return (
            <Link to={`/experiences/${experience.id}`} key={experience.id}>
              <Experience
                id={experience.id}
                imageUrl={experience.imageUrl}
                title={experience.title}
              />
            </Link>
          );
        })}
      </div>
      <div className="md:hidden">
        {experiences.map((experience) => {
          return <div key={experience.id}></div>;
        })}
      </div>
    </div>
  );
};

export default OurTopExperiences;
