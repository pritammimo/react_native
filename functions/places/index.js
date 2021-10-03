const { mocks, addMockImage } = require("./mock");
const url = require("url");

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
    return restaurant;
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${"AIzaSyDDyNPwlw8xWftanmnKCenndPU0Pfu25yc"}`,
  ];
  return restaurant;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;
  if (mock === "true") {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
    }

    return response.json(data);
  }
  client
    .placesNearby({
      params: {
        location: location,
        radius: 1500,
        type: "restaurant",
        key: "AIzaSyDDyNPwlw8xWftanmnKCenndPU0Pfu25yc",
      },
      timeout: 1000,
    })
    .then((res) => {
      res.data.results = res.data.results.map(addMockImage);
      return response.json(res.data);
    })
    .catch((e) => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
};

// const { mocks, addMockImage } = require("./mock");
// const url = require("url");
// const functions = require("firebase-functions");

// const addGoogleImage = (restaurant) => {
//   const ref = restaurant.photos[0].photo_reference;
//   if (!ref) {
//     restaurant.photos = [
//       "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
//     ];
//     return restaurant;
//   }
//   restaurant.photos = [
//     `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${"AIzaSyDDyNPwlw8xWftanmnKCenndPU0P"}`,
//   ];
//   return restaurant;
// };

// module.exports.placesRequest = (request, response, client) => {
//   const { location, mock } = url.parse(request.url, true).query;
//   if (mock === "true") {
//     const data = mocks[location];
//     if (data) {
//       data.results = data.results.map(addMockImage);
//     }

//     return response.json(data);
//   }
//   client
//     .placesNearby({
//       params: {
//         location: location,
//         radius: 1500,
//         type: "restaurant",
//         key: "AIzaSyDDyNPwlw8xWftanmnKCenndPU0Pfu25yc",
//       },
//       timeout: 1000,
//     })
//     .then((res) => {
//       res.data.results = res.data.results.map(addGoogleImage);
//       return response.json(res.data);
//     })
//     .catch((e) => {
//       response.status(400);
//       return response.send(e.response.data.error_message);
//     });
// };
// // AIzaSyDDyNPwlw8xWftanmnKCenndPU0Pfu25yc;
