import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import copy from 'copy-to-clipboard';

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

const About = () => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <h1 className="headingOne pb-2">Developer Information</h1>
      <div className="headingTwo cursor-pointer space-y-1">
        <h2
          onClick={() => {
            copy('+27 72 089 4187');
            Toast.fire({
              icon: 'success',
              title: 'Copied!',
              // text: 'Phone number has been copied to clipboard',
              iconColor: 'green',
            });
          }}
        >
          Name: Tushar
        </h2>
        <h2
          onClick={() => {
            copy('+27 72 089 4187');
            Toast.fire({
              icon: 'success',
              title: 'Copied!',
              // text: 'Phone number has been copied to clipboard',
              iconColor: 'green',
            });
          }}
        >
          Surname: Indurjeeth
        </h2>
        <h2
          onClick={() => {
            copy('+27 72 089 4187');
            Toast.fire({
              icon: 'success',
              title: 'Copied!',
              // text: 'Phone number has been copied to clipboard',
              iconColor: 'green',
            });
          }}
        >
          Email: tushar@tusharin.com
        </h2>
        <h2
          onClick={() => {
            copy('+27 72 089 4187');
            Toast.fire({
              icon: 'success',
              title: 'Copied!',
              // text: 'Phone number has been copied to clipboard',
              iconColor: 'green',
            });
          }}
        >
          Phone: +27 72 089 4187
        </h2>
      </div>
    </div>
  );
};

export default About;
