import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';





function MovieCard({movie}) {
    const navigate =useNavigate();
    const handleBookNow = () => {
        navigate('/seat', { state: { movie } });
      };
    

 
    
    return (
      <>
      
      <Card style={{ width: '18rem' , display: 'flex', flexDirection: 'column' }}  >

            <Card.Header>{movie.location} on {movie.date} at {movie.time}</Card.Header>
            <Card.Img variant="top" src={movie.film_poster} />
            <Card.Body>
                <Card.Title>{movie.movie}</Card.Title>
                <Card.Text>
                    <p><strong>Actors:</strong>{movie.actors}</p>
                    <p><strong>Actresses:</strong>{movie.actresses}</p>
                </Card.Text>
                <Button variant="primary" style={{ marginTop: 'auto' }} onClick={handleBookNow} >Rs.{movie.prices}</Button>
                
                
            </Card.Body>
        </Card>
        
       
             </>


    );
  }
  
  export default MovieCard;