import React from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import api from "../api";
import { useState,useEffect} from "react";
import '../styles/card.css'


function Home(){
    const [movies,setMovies]= useState([])
    const[loading,setLoading]=useState(false)

    
    useEffect(
        ()=>{
            const getMovies=async()=>{
                setLoading(true);
              
                const res = await api.get('/movie/movies_list/').then((res)=>res.data).then(
                    (data)=>{
                        setMovies(data);
                        console.log(data);
                    }
                )
            }
            getMovies();
        },[]
    )
    return <>
    <Navbar/>
    
    <div className="movie-container">
        {movies.map((movie)=>{
            return <MovieCard movie={movie} key={movie.id}/>
        })}
    </div>
    
    
    </>

}
export default Home;