import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Signun() {

    const history=useNavigate();

    const [name,setUserName]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e) {
        e.preventDefault();

        const response = await axios.post("http://localhost:5555/users/signup", { name: name, password: password })
              if (response.status === 200) {
                const token = response.data.token;
                const expires = new Date(Date.now() + 3600000); // 1 hour from now
                document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
                document.cookie = `token=${token}; expires = in 1h for ${Date.now}`;
    
                history("/", { state: { id: name } }); 
              } else {
                console.log("Bad request. Please check your credentials.");
              }
           
    
        // try {
        //     //const response = await axios.post("http://localhost:5555/users/signup", { name: name, password: password });
        //     const response = await fetch('http://localhost:5555/users/signup', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ name: name, password: password})});


        //     console.log(response);
        //     if (response.data === "success") {
        //         history("/home", { state: { id: name } }); 
        //         alert("New User successfully created")
        //     } else {
        //         alert("User has not signed up");
        //     }
        // } catch (error) {
        //     if (error.response) {
        //         alert(error.response.data.message || "An error occurred");
        //     } else {
        //         alert("Error connecting to the server");
        //     }
        //     console.log(error);
        // }
    }


    return (
        <div className="justify-center items-center ml-96 p-5 space-y-4">

            <h1>Sing up</h1>

            <form className="flex flex-col space-y-2 max-w-40 " action="POST">
                <input type="text" onChange={(e) => { setUserName(e.target.value) }} placeholder="User Name"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <button onClick={submit} className="p-2 rounded-lg bg-[#91dae7] hover:bg-[#52d5ec]">Submit</button>
                {/* <input type="submit" onClick={submit} /> */}
            </form>

        </div>
    )
}

export default Signun