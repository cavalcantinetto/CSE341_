export function FooterElement(props) {
  return (
    <div>
      {" "}
      <small className="d-flex flex-column text-center">
        {" "}
        <span> <hr /></span>
        <span className="mt-1"> Great Lakes Food Service </span>{" "}
        <span className="mt-1"> All rights reserved™ </span>{" "}
        <span className="mt-1"> Last Update feb, {props.year}. </span>{" "}
      </small>{" "}
    </div>
  );
}
