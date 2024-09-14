import { useNavigate } from 'react-router-dom';
import { Requestor } from '../../utils/api/Requestor';
import { ToastSetup } from '../../utils/toast/ToastSetup';


function Login() {

  const navigate = useNavigate(); // Get the navigate function


  const makeLoginRequest = async (e) => {
    
    try {
      const loginResponse = await Requestor.postRequest("/auth/login", 
        {
          username: e.target.username.value,
          password: e.target.password.value
        }
      )

      sessionStorage.setItem("accessToken", loginResponse.data.access_token)
      sessionStorage.setItem("refreshToken", loginResponse.data.refresh_token)
  
      ToastSetup.createSuccessToast("Logged in Successfully")
      navigate("/")

    } catch (loginError) {
      ToastSetup.createErrorToast("Invalid Credentials. Please try again.")
    }
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">Login</h1>
          <p className="col-lg-10 fs-4">Welcome to N app. Please login.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form onSubmit={makeLoginRequest} className="p-4 p-md-5 border rounded-3 bg-light">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floating" name="username" placeholder="Username"/>
              <label htmlFor="floatingPassword">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password"/>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-success" type="submit">Login</button>
            {/* <hr className="my-4"/> */}
          </form>
        </div>
      </div>
    </div>
    );
  }
  
  export default Login;