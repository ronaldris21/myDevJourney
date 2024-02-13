import { BsClipboardData } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const InlineError = ({ text }) => {
  return (
    <div className="text-red-600 w-full mt-2 text-xs font-medium">
      <p>{text}</p>
    </div>
  );
};

export const Error = ({ text }) => {
  return (
    <div className="my-12 flex-colo w-full gap-2">
      <img
        src="/images/404.svg"
        alt="404"
        className="w-full h-56 object-contain"
      />
      <h1 className="text-2xl text-red-600 my-4 font-bold text-center">
        Error
      </h1>
      <p className="text-center text-sm">{text}</p>
      <Link to="/">
        <button className=" bg-main rounded mt-4 text-white px-8 py-2">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export const Empty = ({ text }) => {
  return (
    <div className="my-12 flex-colo w-full gap-4">
      <div className="flex-colo w-24 rounded-full h-24 text-main border border-main">
        <BsClipboardData className="text-2xl" />
      </div>
      <h1 className="text-xl text-center font-light">{text}</h1>
      <Link to="/">
        <button className=" bg-main rounded mt-4 text-white px-8 py-2">
          Back Home
        </button>
      </Link>
    </div>
  );
};
