import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import LeagueCard from '../components/home/BooksCard';
import Cookies from 'js-cookie';
import getUserFromToken from "/lib/getToken.js";
import getGames from "/lib/APIactions.js";

const Home = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [user,setUser] = useState()

  //const games = await getGames();
  //console.log(games)

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // console.log(leaguesResponse.data.data)
        const token = Cookies.get("token");
  
        // Fetch user data conditionally (if token exists)
        let userResponse;
        if (token) {
          userResponse = await axios.post('http://localhost:5555/users/token', { token: token });
        }
  
        if (userResponse){
          setUser(userResponse.data);
        }

        setLeagues(userResponse.data.leagues);


        const games = await getGames();
        console.log(games)

  
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    fetchData();
  
    // Dependency array to trigger only on initial render
  }, []);



  return (
    <div className='p-4 flex flex-col'>
      <h1>Welcome Back {user?.name} !</h1>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>All Tables: </h1>
        <div className='flex flex-row space-x-5'>
        <Link to='/home/leagues/create'>
          <div className='flex flex-row items-center space-x-2 p-2 rounded-lg bg-[#91dae7] hover:bg-[#52d5ec]'>
          <MdOutlineAddBox className='text-sky-800 text-2xl' />
          <h2 className='text-1xl text-sky-800'>Create League</h2>
          </div>
        </Link>
        <Link to='/home/leagues/join'>
          <div className='flex flex-row items-center space-x-2 p-2 rounded-lg bg-[#91dae7] hover:bg-[#52d5ec]'>
            <MdOutlineAddBox className='text-sky-800 text-2xl' />
          <h2 className='text-1xl text-sky-800'>Join League</h2>
          </div>
        </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <LeagueCard leagues={leagues} />
      )}
    </div>
  );
};

export default Home;