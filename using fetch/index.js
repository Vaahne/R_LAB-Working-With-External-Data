import * as Carousel from "./Carousel.js";
// import axios from "axios";

// alert("hi");
// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =  "live_BICAt2EBGRp6AyCBGoX2NkPl9HJUofGc16GmMvAquuJlPH2zTmYcICeuyGwc4ejA";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

(async function initialLoad() {
  const breedsData = await fetch("https://api.thecatapi.com/v1/breeds", {
    method: 'GET',
    headers: {
      "x-api-key": API_KEY,
    },
  });
  const breeds = await breedsData.json();

  breeds.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.id;
    option.textContent = element.name;
    breedSelect.appendChild(option);
  });
  console.log(breeds);
  display(breeds[0]);
})();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

breedSelect.addEventListener("change", display);

async function display(e) {
  // alert(e.id);
  try{
  Carousel.clear();
  infoDump.textContent = "";
  let optionSelected = "";
  if (e.target && e.target.value) optionSelected = e.target.value;
  else optionSelected = e.id;
  const selectedBreed = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${optionSelected}&limit=7`,
    {
      header: {
        "x-api-key": API_KEY,
      },
    }
  );
  const data = await selectedBreed.json();

  let description = await fetch(`https://api.thecatapi.com/v1/breeds/${optionSelected}`,{
    method : 'GET',
    headers : {
      "x-api-key": API_KEY,
    }
  })
  description = await description.json();

  const h3 = document.createElement("h3");
  h3.textContent = description.description;
  infoDump.appendChild(h3);

  data.forEach((ele) => {
    carouseCall(ele.url, ele.id, ele.id);
  });
  console.log(data);
  Carousel.start();
}catch(err){
  console.log(err);
}

}

function carouseCall(url, alt, id) {
  const element = Carousel.createCarouselItem(url, alt, id);
  Carousel.appendCarousel(element);
}

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */



/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
