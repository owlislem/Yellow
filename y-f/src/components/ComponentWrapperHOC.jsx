
const ComponentWrapperHOC = (FirstComponent, SecondComponent) => {


  return () => {
    return (
      <>
        <FirstComponent />
        <SecondComponent />
      </>
    );
  };
};

export default ComponentWrapperHOC;
