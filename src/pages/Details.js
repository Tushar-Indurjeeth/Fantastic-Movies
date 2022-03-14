import { useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { fetchMovieDetails } from '../requests/movies';
import { addCard, addCustomFieldData } from '../requests/trello';

import Img from 'react-cool-img';

const MySwal = withReactContent(Swal);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const Details = () => {
  const [searchParams] = useSearchParams();

  const movieId = searchParams.get('id');

  const { isLoading, isError, data, error } = useQuery(
    ['movieDetails', movieId],
    () => fetchMovieDetails(movieId)
  );

  const {
    mutateAsync: addFieldMutateAsync,
    isSuccess: addCardFieldsSuccess,
    isLoading: isAddingField,
    error: addFieldError,
  } = useMutation(addCustomFieldData);

  const {
    data: addCardData,
    isSuccess: addCardDataSuccess,
    mutateAsync: addCardMutateAsync,
    isLoading: isAddingCard,
    error: addCardError,
    status: addCardStatus,
  } = useMutation(addCard);

  const enteredNameRef = useRef(null);
  const enteredSurnameRef = useRef(null);
  const enteredEmailRef = useRef(null);
  const enteredPhoneNumberRef = useRef(null);

  const [isSending, setIsSending] = useState(false);

  if (isLoading) return <Loading />;

  if (isError) return <span>Error: {error.message}</span>;

  const yearReleased = new Date(data.release_date).getFullYear();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const enteredName = enteredNameRef.current.value.trim();
    const enteredSurname = enteredSurnameRef.current.value.trim();
    const enteredEmail = enteredEmailRef.current.value.trim();
    const enteredPhoneNumber = enteredPhoneNumberRef.current.value.trim();

    try {
      return await addCardMutateAsync({
        name: enteredName,
        surname: enteredSurname,
        pos: 'top',
        idList: process.env.REACT_APP_TRELLO_LIST_ID,
      }).then((cardData) => {
        [
          [enteredName, process.env.REACT_APP_TRELLO_NAME_ID],
          [enteredSurname, process.env.REACT_APP_TRELLO_SURNAME_ID],
          [enteredEmail, process.env.REACT_APP_TRELLO_EMAIL_ID],
          [enteredPhoneNumber, process.env.REACT_APP_TRELLO_PHONE_NUMBER_ID],
          [data.original_title, process.env.REACT_APP_TRELLO_MOVIE_ID],
        ].forEach(
          async (data) =>
            await addFieldMutateAsync(
              {
                data: data[0],
                cardId: cardData.id,
                field: data[1],
              },
              {
                onError: (error, variables, context) => {
                  console.error(error);
                  MySwal.fire('Failed to create Trello card');
                  setIsSending(false);
                },

                onSuccess: (data, error, variables, context) => {
                  enteredEmailRef.current.value = '';
                  enteredNameRef.current.value = '';
                  enteredPhoneNumberRef.current.value = '';
                  enteredSurnameRef.current.value = '';
                  MySwal.fire(
                    'Success!',
                    'Trello Card has successfully been created',
                    'success'
                  );
                  setIsSending(false);
                },
              }
            )
        );
      });
    } catch (error) {
      console.error(error);
      MySwal.fire('Failed to create Trello card');
      setIsSending(false);
    }
  };

  const voteAvg = data.vote_average * 10;

  const bgColor =
    voteAvg === 0
      ? 'bg-gray-500'
      : voteAvg >= 70
      ? 'bg-green-500'
      : voteAvg >= 50
      ? 'bg-yellow-600'
      : 'bg-red-500';

  return (
    <div className="w-4/5 m-auto mt-10">
      <div className="grid grid-flow-row lg:grid-flow-col space-x-4">
        <div className="flex m-auto mb-3">
          <Img
            src={
              `${process.env.REACT_APP_BASE_URL}${
                data.poster_path || data.backdrop_path
              }` || `${process.env.REACT_APPBASE_URL}${data.poster_path}`
            }
            alt={data.original_title}
            height="32"
            className="block max-w-xs max-h-sm w-auto h-auto"
          />
        </div>
        <div className="space-y-3 flex flex-col flex-grow">
          <div>
            <div className="flex flex-row pb-1 space-y-2 space-x-1">
              <h1 className="headingOne underline">{data.original_title}</h1>
              <p className="text-xl">({yearReleased})</p>
            </div>
            <p>{data.tagline}</p>
          </div>

          <div className="w-full">
            <h1 className={`headingOne ${bgColor} w-1/2 sm:w-1/3 flex`}>
              {`Rating: ${voteAvg}`}{' '}
            </h1>
          </div>

          <div>
            <h1 className="headingOne w-3/4">Overview</h1>
            <p>{data.overview}</p>
          </div>

          <div>
            <h1 className="headingOne">Genres</h1>
            <div className="flex space-x-2">
              {data.genres.map((genre, i) => (
                <p key={genre.id}>
                  {genre.name}
                  {i < data.genres.length - 1 && ','}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-3/4 m-auto">
        <form
          method="POST"
          onSubmit={submitHandler}
          className="flex flex-col space-y-3 m-auto"
        >
          <div className="flex flex-col space-y-3 md:px-10 pt-7">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              className="input"
              ref={enteredNameRef}
              required
            />
            <input
              id="surname"
              type="text"
              placeholder="Surname"
              className="input"
              ref={enteredSurnameRef}
              required
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              ref={enteredEmailRef}
              required
            />
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              className="input"
              ref={enteredPhoneNumberRef}
              required
            />
          </div>

          <div className="md:px-10 m-auto pb-9">
            <button
              type="submit"
              className="text-[#f8f8ff] bg-gray-800 px-10 py-3 rounded-md focus:outline-none"
              disabled={isSending}
            >
              {isSending ? 'Submiting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;
