export default async () => {
  const response = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  return (await response).json();
};
