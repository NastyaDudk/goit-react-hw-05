import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>Page you visited does not exist.</h1>
      <Link to="/">Go Home</Link>
    </>
  );
};

export default NotFoundPage;
