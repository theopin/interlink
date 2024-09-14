import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom'


function InvalidRoute() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center error-container">
        <h2>Oops! An error occurred.</h2>
        <Link to={'/dashboard'}>
            <button className="btn btn-primary">
                Go to Dashboard
            </button>
        </Link>

    </div>
  );
}

export default InvalidRoute