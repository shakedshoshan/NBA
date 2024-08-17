import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';


const BookSingleCard = ({ league }) => {
  // const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h1 className='text-2xl font-semibold mb-3'>{league.name}</h1>
      <h2 className='text-xl underline font-medium'>Table:</h2>
      {
        league.users.map((user) => (
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