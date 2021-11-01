export default async (token) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=5&token=${token}`,
  );
  return (await response).json();
};
