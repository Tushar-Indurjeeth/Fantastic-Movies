import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 p-32 rounded-lg bg-white">
        <div className="flex flex-col space-y-28 justify-center ">
          <h1 className="flex text-2xl md:text-3xl lg:text-4xl">
            Welcome to fantastic films
          </h1>
          <div>
            <Link
              to="films"
              className="uppercase grid text-center bg-green-500 text-sm sm:text-lg pr-3 p-2 sm:p-4 font-semibold rounded-md"
            >
              Browse Films
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
