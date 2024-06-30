import { Alert } from "react-bootstrap";

const NotFound = () => {
    return (
        <>
            <Alert className="mt-4">
                <Alert.Heading>Not found this address!</Alert.Heading>
                <p>Make sure to enter the correct path</p>
            </Alert>
        </>
    )
};

export default NotFound;