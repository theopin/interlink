import { Requestor } from '../../utils/api/Requestor';


const makeSignupRequest = async (e) => {
  e.preventDefault();
  console.log(e.target.username.value)
  
  try {
    await Requestor.postRequest("/users/signup", 
      {
        username: e.target.username.value,
        password: e.target.password.value,
        email: e.target.email.value
      }
    )


  } catch (loginError) {
    console.log("err in login", loginError);
  }
};

function Signup() {
    return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">Login</h1>
          <p className="col-lg-10 fs-4">Welcome to N app. Please sign up.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form onSubmit={makeSignupRequest} className="p-4 p-md-5 border rounded-3 bg-light">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floating" name="username" placeholder="Username"/>
              <label for="floatingPassword">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingInput" name="email" placeholder="name@example.com"/>
              <label for="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" name="password"placeholder="Password"/>
              <label for="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
    );
  }
  
  export default Signup;