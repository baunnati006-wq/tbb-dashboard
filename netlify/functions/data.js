const fs = require('fs');
const path = require('path');

const filePath = '/tmp/data.json';

exports.handler = async function (event) {

  try {

    // SAVE
    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || "{}");

      fs.writeFileSync(filePath, JSON.stringify(data));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Saved" }),
      };
    }

    // LOAD
    if (event.httpMethod === 'GET') {
      if (!fs.existsSync(filePath)) {
        return {
          statusCode: 200,
          body: "{}",
        };
      }

      const data = fs.readFileSync(filePath, 'utf-8');

      return {
        statusCode: 200,
        body: data,
      };
    }

    return {
      statusCode: 405,
      body: "Method not allowed"
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
