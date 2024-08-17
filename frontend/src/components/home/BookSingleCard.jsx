import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const BookSingleCard = ({ league }) => {
    const [data, setData] = useState();

    useEffect(() => {
      const fetchData = async () => {
        try {
            axios
                  .get(`http://localhost:5555/leagues/${league}`)
                  .then((response) => {
                    setData(response.data);
                    
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                } catch (error) {
                  console.error(error);
                  setLoading(false);
                }
              };
            
              fetchData();
            
              // Dependency array to trigger only on initial render
            }, []);
          
            // console.log(data.users);
  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h1 className='text-2xl font-semibold mb-3'>{data?.name}</h1>
      <h2 className='text-xl underline font-medium'>Table:</h2>
      {
        data?.users.map((user) => (
          <div key={user.name} className='flex flex-row items-center justify-center space-y-2'>
            <BiUserCircle className='inline-block mr-2' />
            <span>{user.name}:</span>
            <span className='ml-auto'>{user.points}</span>
          </div>
        ))
      } 
    </div>
  );
};

export default BookSingleCard;