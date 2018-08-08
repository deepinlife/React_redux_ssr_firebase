
const SendHtml = ({ markup }) => `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossorigin="anonymous">
        <script src="./bundle.js" defer></script>
        <link rel="stylesheet" href='main.css'>
      </head>
      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
   `;

export default SendHtml;