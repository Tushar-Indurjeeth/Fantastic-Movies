import Results from '../components/Results';
import Loading from '../components/Loading';
import { useInfiniteQuery } from 'react-query';
import { fetchInfiniteMovies } from '../requests/movies';

const Films = () => {
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery('movies', fetchInfiniteMovies, {
      getNextPageParam: (lastPage, pages) => {
        // console.log(`LAST PAGE: ${lastPage.total_pages}`);
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return false;
      },
    });

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchNextPage();
    }
  };

  return status === 'loading' ? (
    <Loading />
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map(({ results }, i) => (
        <Results key={i} results={results} />
      ))}

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
};

export default Films;
