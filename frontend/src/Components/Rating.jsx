import React from "react";

const Rating = (props) => {
  const { rating, numReviews, caption } = props;
  return (
    <>
      <div className='rating'>
        <span>
          <i
            className={
              rating >= 1
                ? "fa fa-star"
                : rating >= 0.5
                ? "fa fa-star-half-alt"
                : "fa fa-start"
            }
          ></i>
        </span>

        <span>
          <i
            className={
              rating >= 2
                ? "fa fa-star"
                : rating >= 1.5
                ? "fa fa-star-half-alt"
                : "fa fa-start"
            }
          ></i>
        </span>

        <span>
          <i
            className={
              rating >= 3
                ? "fa fa-star"
                : rating >= 2.5
                ? "fa fa-star-half-alt"
                : "fa fa-start"
            }
          ></i>
        </span>

        <span>
          <i
            className={
              rating >= 4
                ? "fa fa-star"
                : rating >= 3.5
                ? "fa fa-star-half-alt"
                : "fa fa-start"
            }
          ></i>
          <span>
            <i
              className={
                rating >= 5
                  ? "fa fa-star"
                  : rating >= 4.5
                  ? "fa fa-star-half-alt"
                  : "fa fa-start"
              }
            ></i>
          </span>
        </span>
        {caption ? (
          <span>{caption}</span>
        ) : (
          <span>{" " + numReviews + " avis"}</span>
        )}
      </div>
    </>
  );
};

export default Rating;
