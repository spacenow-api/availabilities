const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': 'x-requested-with'
}

export default {
  success: (data) => {
    return {
      headers,
      statusCode: 200,
      body: data && JSON.stringify(data)
    }
  },

  failure: (err) => {
    console.error(err)
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({ error: err.message ? err.message : { error: 'Error message not identified.', stack: err } })
    }
  }
}
