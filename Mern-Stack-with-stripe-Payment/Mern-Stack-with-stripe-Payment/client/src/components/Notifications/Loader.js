import { ScaleLoader } from 'react-spinners';

export function Loader() {
  return (
    <div className="w-full py-4 px-2 flex-colo">
      <ScaleLoader color="#3474E3" />
    </div>
  );
}

export const CatLoader = () => {
  return (
    <div className="p-6 flex-colo gap-4 border border-gray-200 rounded-xl animate-pulse">
      <div className="rounded-full w-20 h-20 bg-dryGray" />
      <span className=" py-4 w-full bg-dryGray rounded" />
    </div>
  );
};

export const CardLoader = () => {
  return (
    <div className=" gap-5 animate-pulse rounded-lg p-4 flex-colo bg-white">
      <div className="p-2 border bg-dryGray border-gray-200 rounded-lg w-full h-56 md:h-96 overflow-hidden relative" />
      <span className=" py-3 w-3/5 bg-dryGray rounded" />
      <span className=" py-2 w-2/5 bg-dryGray rounded" />
    </div>
  );
};

export const OfferLoader = () => {
  return (
    <div className="animate-pulse rounded-lg w-full p-4 flex-colo bg-white relative">
      <div className="border bg-deepGray border-gray-200 rounded-lg w-full h-96 overflow-hidden" />
      <div className="absolute top-10 text-xs w-12 h-6 font-bold left-10 bg-red-200 rounded-full " />
    </div>
  );
};
