export const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-2xl text-gray-600 hover:text-black"
      >
        ➡️
      </div>
    );
  };
  
  export const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-2xl text-gray-600 hover:text-black"
      >
        ⬅️
      </div>
    );
  };
  