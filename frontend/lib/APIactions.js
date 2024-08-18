export default async function getGames() {

    fetch("https://v3.football.api-sports.io/predictions?fixture=198772", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "492aaf63eedf5af494111be93f341184"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
    // const url = new URL(`https://v3.football.api-sports.io/widgets/Games`);
    // // console.log(process.env.SPORT_API_SECRET);
    
    // const options = {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //     Authorization: `Bearer 492aaf63eedf5af494111be93f341184`,
    //   },
    //   next: {
    //     revalidate: 60 * 60 * 24,
    //   },
    // };

    // // console.log("----------------------Getting games------------------------");
    // const response = await fetch(url.toString());
    // //console.log(response);
    // //const data = (await response.json());
  
    // return response;
  }