import "./AcceptBtn.scss";

const AcceptBtn = () => {
  return (
    <>

      <div className="pb-radio">
        <input type="radio" name="export" value="email" />
        <span className="checkmark"></span>
      </div>
    </>
  );
};

export default AcceptBtn;
