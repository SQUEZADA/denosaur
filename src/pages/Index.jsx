import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Index = () => {
  const [dinos, setDinos] = useState([]);
  const [allDinos, setAllDinos] = useState([]);
  const [page,setPage] = useState(0);
  const [dinoPerPage,setDinoPerPage] = useState(10);
  useEffect(() => {
    fetch(`http://localhost:8000/api/`)
      .then(async (res) => await res.json())
      .then((json) => {
        setAllDinos(json) 
        setDinos(json.slice(0,10))
      });
  }, []);
  useEffect(() => {
    const startFrom = (page === 0) ? 0 : page*dinoPerPage;
    const endAt = (page+1) * dinoPerPage;
    setDinos(allDinos.slice(startFrom,endAt));
    if(page == 0){
      document.getElementById("prevBtn").disabled = true;
    }else{
      document.getElementById("prevBtn").disabled = false;
    }
  }, [page]);
  const nextPage = () => setPage(page+1)
  const prevPage = () => (page <= 0) ? setPage(0) : setPage(page-1)
  return (
    <div>
      <h1>Welcome to the Dinosaur app</h1>
      <p>
        Click on a dinosaur below to learn more.
      </p>
      <div>
        {dinos.map((dino,key) => {
          return (
            <div key={`${dino.name.toLowerCase()}_key`}>
              <Link to={`/${dino.name.toLowerCase()}`}>{dino.name}</Link>
            </div>
          );
        })}
        <button onClick={()=>prevPage()} id="prevBtn">Prev</button>
        <button onClick={()=>nextPage()}>Next</button>
      </div>
    </div>
  );
};

export default Index;