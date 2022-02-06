import React, { ChangeEvent, useEffect, useState } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import '../assets/css/SearchGif.css';

// variable that get giphy code
const gf = new GiphyFetch('0U6DW1ZMVMxiwu9Rk5tqnm4SgbfnpGmT');

// function component SearchGif
const SearchGif = () => {

  // search state 
  const [search, setSearch] = useState("");

  // widthGifs state has a default value for 
  // width of the grid
  const [widthGifs, setWidthGifs] = useState(800);
  
  // columnsGifs state has a default value for 
  // columns of the grid
  const [columnsGifs, setColumnsGifs] = useState(3);

  // get the width of screen
  const widthScreen = window.screen.width;

  // function get value of input search 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // if there is more than 3 lyrics do search
    if(val.length >= 3){
      setSearch(val);
    }else{
      setSearch("");
    }
  }

  useEffect(() => {
    
    // if width is less than 800, 
    // show 2 columns and an width of 600px  
    if(widthScreen < 800){
      setWidthGifs(600);
      setColumnsGifs(2);
    }
    
    // if width is less than or equal to 600, 
    // show 1 columns and an width of 400px  
    if(widthScreen <= 600){
      setWidthGifs(400);
      setColumnsGifs(1);
    }

  }, [widthScreen])

  const fetchGifs = (offset: number) => gf.search(search, { offset, limit: 5 });

  return (
    <>
      <h2>Search GIFS</h2>

      <input type="text" className="search-input" onChange={e => handleChange(e)} placeholder="Buscar un GIF" />

      <div className="search-box">
        <Grid width={widthGifs} columns={columnsGifs} fetchGifs={fetchGifs} key={search} />
      </div>
    </>
  );
}

export default SearchGif;