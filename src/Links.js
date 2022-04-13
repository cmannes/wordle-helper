import {Link} from "react-router-dom";

const Links = () => {

  return (
    <div>
      <Link to="/Wordle">Wordle</Link> |{" "}
      <Link to="/Reading">Reading</Link>
    </div>
  );
}

export default Links;