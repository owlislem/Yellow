import PropTypes from "prop-types";
const Program = (props) => {
  return (
    <div className="px-[25px] md:px-[50px]  lg:px-[150px] mb-[100px]">
      <h2 className="h3-medium capitalize mt-[50px] mb-[20px]">Program:</h2>
      <div className="program-grid md:ml-[40px]">
        {props.program.map((step, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col gap-[10px] z-10  any-step mb-[20px]  ${
                index !== props.program.length - 1 && "step"
              }`}
            >
              <div className="w-[30px] bg-yellow-primary rounded-[20px] text-center">
                {index + 1}
              </div>
              <ul className="pr-[20px]">
                {[["Accommodation", "Scenic Tours"]].map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="list-disc nano-regular md:small-regular "
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Program;
Program.propTypes = {
  program: PropTypes.array.isRequired,
};
