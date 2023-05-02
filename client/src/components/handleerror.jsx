import React from "react";

function ErrorFallback(props) {

    function refreshPage() {
        window.location.reload(false);
      }

    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{props.error}</pre>
        <button onClick={refreshPage}>Try again</button>
      </div>
    )
  }

  export default ErrorFallback;