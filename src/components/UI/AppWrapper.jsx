import Header from "../Header/Header";

const AppWrapper = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default AppWrapper;
