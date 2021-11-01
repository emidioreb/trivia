import md5 from 'crypto-js/md5';

export default async (email) => {
  const hash = md5(email).toString();
  const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return response.url;
};
