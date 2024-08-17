import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const JoinLeague = () => {
  const [leagueName, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const users = [];
  const [user,setUser] = useState()

  

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
  
        // console.log(userResponse.data.name, userResponse.data._id)

        if (userResponse){
          setUser(userResponse.data);
        }
  
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    fetchData();
  
  }, []);

  const handleSaveBook = () => {
    console.log(user)
    const data = {
      name:user.name,
      id: user._id
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/leagues/join', {name: leagueName, user: data})
      .then(() => {
        setLoading(false);
        console.log('league created successfully');
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Join League</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Enter League Name</label>
          <input
            type='text'
            value={leagueName}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
       
        <button className='p-2 bg-sky-300 m-8 hover:bg-sky-500 rounded-lg font-bold' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default JoinLeague