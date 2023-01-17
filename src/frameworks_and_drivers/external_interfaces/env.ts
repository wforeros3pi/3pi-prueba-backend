(async () => {
  const ENV = process.env.NODE_ENV ?? 'development';
  if (ENV === 'development') {
    const dotenv = await import('dotenv');
    dotenv.config({ debug: true });
  }
})();
