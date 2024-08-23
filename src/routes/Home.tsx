import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Dav og velkomme til atletikken</h1>
      <nav>
        <ul>
          <li>
            <Link to="/about">Om</Link>
          </li>
          <li>
            <Link to="/events">Stævne og events</Link>
          </li>
        </ul>
      </nav>
      <h3> Følg med næste gang, hvor det bliver endnu mere spændende</h3>
    </div>
  );
};

export default Home;
