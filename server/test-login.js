const fetch = global.fetch || require('node-fetch');
(async () => {
  try {
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'instructor@localhost', password: 'test1234' }),
    });
    const body = await response.text();
    console.log('status', response.status);
    console.log(body);
  } catch (err) {
    console.error(err);
  }
})();
