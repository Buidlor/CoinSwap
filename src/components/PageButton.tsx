const PageButton = ({ name, isActive }) => {
  return (
    <div className="tab tab-lg">
      <span className={isActive ? "font-bold" : " font-normal"}>{name}</span>
    </div>
  );
};
export default PageButton;
