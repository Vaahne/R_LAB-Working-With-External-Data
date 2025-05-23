import * as Carousel from "./Carousel.js";
// import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js";
// import axios from "axios";

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
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
interceptors();

(async function initialLoad() {
    try {
        const breedsData = await axios.get("https://api.thecatapi.com/v1/breeds", {
            headers: {
                "x-api-key": API_KEY,
            },
            onDownloadProgress: updateProgess
        })

        console.log('Download complete');
        progressBar.style.width = '100%'; 

        const breeds = breedsData.data;

        breeds.forEach((element) => {
            const option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.name;
            breedSelect.appendChild(option);
        });

        display(breeds[0]);
    } catch (err) {
        console.log(err);
    }
})();


breedSelect.addEventListener("change", display);

async function display(e) {
    // alert(e.id);
    try{
    Carousel.clear();
    infoDump.textContent = "";
    let optionSelected = "";
    if (e.target && e.target.value) optionSelected = e.target.value;
    else optionSelected = e.id;
    const selectedBreed = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${optionSelected}&limit=7`,
        {
            header: {
                "x-api-key": API_KEY,
            },
            onDownloadProgress: updateProgess
        })

        console.log('Download complete');
        progressBar.style.width = '100%'; 
        
    const data = selectedBreed.data;

    let description = await axios.get(`https://api.thecatapi.com/v1/breeds/${optionSelected}`,{
        onDownloadProgress: updateProgess
    })

    console.log('Download complete');
    progressBar.style.width = '100%'; 

    description = description.data;
    
    const h3 = document.createElement("h3");
    h3.textContent = description.description;
    infoDump.appendChild(h3);

    data.forEach((ele) => {
        carouseCall(ele.url, ele.id, ele.id);
    });
    Carousel.start();
    }catch(err){
        console.error(err);
    }
}

function carouseCall(url, alt, id) {
    const element = Carousel.createCarouselItem(url, alt, id);
    Carousel.appendCarousel(element);
}


/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

function interceptors(){
    axios.interceptors.request.use(request => {
        document.body.style.cursor = 'progress';
        request.metadata = request.metadata || {};
        request.metadata.startTime = new Date().getTime();
        progressBar.style.width = '0%';
        return request;
    });

    axios.interceptors.response.use(
        (response) => {
            response.config.metadata.endTime = new Date().getTime();
            response.config.metadata.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;
            document.body.style.cursor = 'default';
            console.log(`Request took ${response.config.metadata.durationInMS} milliseconds.`)
            return response;
        },
        (error) => {
            error.config.metadata.endTime = new Date().getTime();
            error.config.metadata.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;

            console.log(`Request took ${error.config.metadata.durationInMS} milliseconds.`)
            throw error;
    });

}


/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */
function updateProgess(progressEvent){
    // Calculate the progress percentage
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    console.log(`Downloaded ${percentCompleted}%`);
    
    // You can also update a progress bar here (if you have one in the UI)
    progressBar.style.width = `${percentCompleted}%`;
}
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
