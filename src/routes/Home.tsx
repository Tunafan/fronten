import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Dav og velkommen til atletikken</h1>
      <nav>
        <ul>
          <li>
            <Link to="/about">Om</Link>
          </li>
          <li>
            <Link to="/events">Stævne og events</Link>
          </li>
          <li>
            <Link to="/fields">Baner</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
