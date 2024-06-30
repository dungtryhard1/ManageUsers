import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const user = useSelector(state => state.user.account)
  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>Oh snap! You don't have permission to access it!</Alert.Heading>
          <p>You need to login to continue.</p>  
        </Alert>
      </>
    );
  } else {
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
