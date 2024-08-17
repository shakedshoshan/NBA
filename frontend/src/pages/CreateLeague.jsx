import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from 'notistack';

const CreateLeague = () => {
  const [leagueName, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const users = [];
//   const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      name:leagueName,
      users: []
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/leagues', data)
      .then(() => {
        setLoading(false);
        console.log('Book created successfully');
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create League</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>League Name</label>
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

export default CreateLeague