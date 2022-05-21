const fetch = require('node-fetch');

module.exports = PushToDB = async (movieData, i) => {
    console.log(i, " elementas: ", movieData);

    const submitUrl = `http://localhost:5000/secured/add-movie`;

    try {

        const request = await fetch(submitUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        })

        if(!request.ok) throw new Error("Something goes wrong");

        const responseData = await request.json();

        console.log("Response: ", responseData);

    } catch (error) {

        console.log("Error'as scripte: ", error);
    }

    
};