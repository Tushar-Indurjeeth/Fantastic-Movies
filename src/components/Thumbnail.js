import { ThumbUpIcon } from '@heroicons/react/outline';
import { forwardRef } from 'react';
import Img from 'react-cool-img';
import { Link } from 'react-router-dom';

const Thumbnail = forwardRef(({ result }, ref) => {
  const voteAvg = result.vote_average * 10;

  const slashColor =
    voteAvg === 0
      ? 'bg-gray-500'
      : voteAvg >= 70
      ? 'bg-green-500'
      : voteAvg >= 50
      ? 'bg-yellow-600'
      : 'bg-red-500';

  return (
    <Link
      ref={ref}
      className="z-20 p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105"
      to={`/film/?id=${result.id}`}
    >
      <Img
        style={{ backgroundColor: 'grey', width: '500', height: '281' }}
        src={
          `${process.env.REACT_APP_BASE_URL}${
            result.backdrop_path || result.poster_path
          }` || `${process.env.REACT_APP_BASE_URL}${result.poster_path}`
        }
        alt={result.title}
      />

      <div className="w-3/12 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/4 absolute">
        <span
          className={`w-full text-emerald-200 relative -mt-[32rem] sm:-mt-64 md:-mt-40 lg:-mt-52 xl:-mt-40 bg transform skew-y-140 flex flex-grow justify-center text-lg ${slashColor}`}
        >
          {voteAvg}
        </span>
      </div>

      <div className="p-2">
        <p className="truncate max-w-md">{result.overview}</p>

        <h2 className="mt-1 text-2xl transition-all duration-100 ease-in-out group-hover:font-bold">
          {result.title || result.original_name}
        </h2>

        <p className="flex items-center opacity-0 group-hover:opacity-100">
          {result.media_type && `${result.media_type} •`}{' '}
          {result.release_date || result.first_air_date} •{' '}
          <ThumbUpIcon className="h-5 mx-2" />
          {result.vote_count}
        </p>
      </div>
    </Link>
  );
});

export default Thumbnail;
