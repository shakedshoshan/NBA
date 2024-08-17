import React from 'react'
import { useParams } from 'react-router-dom'

function LeagueTable() {
    const [league, setLeague] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
          .get(`http://localhost:5555/leagues/${id}`)
          .then((response) => {
            setLeague(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }, []);

    
  return (
    <div>
        <h1>{league}</h1>
        </div>
  )
}

export default LeagueTable