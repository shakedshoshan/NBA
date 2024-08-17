import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookSingleCard from './BookSingleCard';

const LeagueCard = ({ leagues }) => {
  // console.log(leagues);
  return (
    <div key={leagues} className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {leagues.map((item) => (
        
          <BookSingleCard key={item} league={item} />
       
      ))}
    </div>
  );
};

export default LeagueCard;