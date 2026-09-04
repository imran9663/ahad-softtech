module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/forms/contact',
      handler: 'forms.contact',
      config: { auth: false }
    },
    {
      method: 'POST',
      path: '/forms/request-quote',
      handler: 'forms.requestQuote',
      config: { auth: false }
    },
    {
      method: 'POST',
      path: '/forms/career',
      handler: 'forms.career',
      config: { auth: false }
    }
  ]
};
