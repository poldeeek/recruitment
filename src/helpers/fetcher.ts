const fetcher = (url: string) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

export default fetcher;
