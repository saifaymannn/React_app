

// const url = 'https://api.edamam.com/api/nutrition-data';
// const queryParams = {
//     app_id: '109ffc38',
//     app_key: '38969c3a70af500165115f7470b6beae',
//     ingr: '1 cup rice, 10 oz chickpeas'
// };

// // Constructing the query string
// const queryString = Object.keys(queryParams)
//   .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
//   .join('&');

// // Sending the request
// fetch(`${url}?${queryString}`)
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       return response.json();
//   })
//   .then(data => {
//       // Handle the response data here
//       console.log(data);
//   })
//   .catch(error => {
//       console.error('There was a problem with the request:', error);
//   });


// //   curl -X GET "https://api.edamam.com/nutrition-data?app_id=109ffc38&app_key=38969c3a70af500165115f7470b6beae&ingr=1%20cup%20rice,%2010%20oz%20chickpeas"

