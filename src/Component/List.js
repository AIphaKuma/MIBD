import React from "react";

const List = (props) => {
    return (
        <>
        {props.movies.map((movie, index) => (
            <div className="movie">
                <img src={movie.Poster} alt='filmPoster'></img>
                <p className="titleMovie"> {movie.Title} </p>
            </div>
        ))}
        </>
    )
};

export default List;