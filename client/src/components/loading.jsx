import React from "react";

const Loading = () => {
    return (
        <div className="container text-center">
        <button className="btn btn-danger" type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
</button></div>
    )
}
export default Loading;