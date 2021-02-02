const baseApiUrl = 'http://localhost:8989/MyMovieApi/api';
export const environment = {
  production: true,

  movie: {
    getAllMovies: ()  => `${baseApiUrl}/movie/getAllMovies`,

    createMovie: () => `${baseApiUrl}/movie/createMovie`,

    updateMovie: () => `${baseApiUrl}/movie/updateMovie`,

    deleteMovie: (id: number) => `${baseApiUrl}/movie/deleteMovie/${id}`
  }
};
