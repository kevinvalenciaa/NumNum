import type { Restaurant } from "../types/restaurant"

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Tasty Burger Joint",
    cuisine: "American",
    rating: 4,
    priceRange: "$$",
    distance: 0.5,
    isOpen: true,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/dc9cf566811953.5b22ce31f3821.jpg",
    website: "https://example.com/tasty-burger",
    reviews: [
      { id: "1", text: "Great burgers and friendly staff!", rating: 4.5, source: "Yelp" },
      { id: "2", text: "The fries were a bit soggy, but overall good experience.", rating: 3.5, source: "Google" },
      { id: "3", text: "Just put the fries in the bag bro.", rating: 1, source: "Website" },
    ],
  },
  {
    id: "2",
    name: "Sushi Paradise",
    cuisine: "Japanese",
    rating: 5,
    priceRange: "$$$",
    distance: 1.2,
    isOpen: true,
    image:
      "https://static.wixstatic.com/media/d4aaa2_e8732ca5afd841759dbba230a714f120~mv2.jpg/v1/fill/w_640,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d4aaa2_e8732ca5afd841759dbba230a714f120~mv2.jpg",
    website: "https://example.com/sushi-paradise",
    reviews: [
      { id: "1", text: "Fresh fish and amazing presentation!", rating: 4.5, source: "Yelp" },
      { id: "2", text: "A bit pricey, but worth it for the quality.", rating: 4, source: "Google" },
      { id: "3", text: "Best sushi I've ever had!", rating: 5, source: "Website" },
    ],
  },
  {
    id: "3",
    name: "Starbucks",
    cuisine: "American",
    rating: 4.2,
    priceRange: "$$",
    distance: 1.2,
    isOpen: true,
    image:
      "https://img.freepik.com/premium-photo/interior-starbucks-coffee-shop-starbucks-corporation-is-american-coffee-company-coffeehous_1308175-207548.jpg",
    website: "https://www.starbucks.ca/store-locator?map=57.751076,-101.645508,4z",
    reviews: [
      { id: "1", text: "Fresh fish and amazing presentation!", rating: 4.5, source: "Yelp" },
      { id: "2", text: "A bit pricey, but worth it for the quality.", rating: 4, source: "Google" },
      { id: "3", text: "Best sushi I've ever had!", rating: 5, source: "Website" },
    ],
  },
  {
    id: "4",
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 3,
    priceRange: "$",
    distance: 0.8,
    isOpen: false,
    image: "https://t3.ftcdn.net/jpg/08/00/82/28/360_F_800822874_HG5C3aHZyQnLn4pD7qCao98daL5llH9G.jpg",
    website: "https://example.com/pizza-palace",
    reviews: [
      { id: "1", text: "Good pizza, but slow service.", rating: 3, source: "Yelp" },
      { id: "2", text: "Decent pizza for the price.", rating: 3.5, source: "Google" },
    ],
  },
  {
    id: "5",
    name: "Taco Town",
    cuisine: "Mexican",
    rating: 4,
    priceRange: "$$",
    distance: 1.5,
    isOpen: true,
    image:
      "https://cdn.theatlantic.com/thumbor/6q9c2S7xV8Jh0MBru5oqrO5c_8c=/1613x1080:5002x3622/1200x900/media/img/mt/2016/04/selects_08/original.jpg",
    website: "https://example.com/taco-town",
    reviews: [
      { id: "1", text: "Authentic Mexican flavors!", rating: 4.5, source: "Yelp" },
      { id: "2", text: "Great value for money.", rating: 4, source: "Google" },
      { id: "3", text: "Best tacos in town!", rating: 5, source: "Website" },
    ],
  },
  {
    id: "6",
    name: "Noodle House",
    cuisine: "Chinese",
    rating: 4,
    priceRange: "$$",
    distance: 2.0,
    isOpen: true,
    image: "https://cdn.snsimg.carview.co.jp/minkara/blog/000/045/181/506/45181506/p1.jpg?ct=fddfa742ebb2",
    website: "https://example.com/noodle-house",
    reviews: [
      { id: "1", text: "Delicious noodles and friendly service!", rating: 4, source: "Yelp" },
      { id: "2", text: "A bit far from the city center, but worth the trip.", rating: 4.5, source: "Google" },
    ],
  },

]

