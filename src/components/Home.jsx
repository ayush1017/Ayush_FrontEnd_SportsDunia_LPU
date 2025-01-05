import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase/firebase.config';
import Header from './Header';
import { useEffect,useState } from 'react';
import { NCard } from '.';
import axios from 'axios';
import { useContext } from 'react';
import { Usercontext } from './Header';
import { useSearch } from './context';
function Home() {
  // const apikey="5387d27d86764991a64e7fe3db6931a6"

   const {query}=useSearch();
   const {frm}=useSearch();
   const {td}=useSearch();
   const {srcc}=useSearch();

   console.log(frm);
   console.log(td);
   const [loading,setloading]=useState(false);
   const [err,seterr]=useState();
   const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // const finalFrom = formatDate(frm);
  // const finalTo = formatDate(td);
  const finalFrom = frm ? formatDate(frm) : '2024-12-05';  // Default to today's date if frm is missing
  const finalTo = td ? formatDate(td) :''  // Default to today's date if td is missing
  const finalQuery = query || 'tesla';  // Default to 'latest' if no query is provided
  const finalSource = srcc || ' '; 

   const baseUrl=` https://newsapi.org/v2/everything?q=${query}&from=${finalFrom}&to=${finalTo}&sources=${srcc}&sortBy=publishedAt&apiKey`
    const apikey="5387d27d86764991a64e7fe3db6931a6"
   
    const [newsData, setNewsData] = useState([]);

    
    
    useEffect(() => {
      fetch(`${baseUrl}=${apikey}`)
        .then(response => response.json())
        .then(data => setNewsData(data.articles))  // Assuming data.articles contains the articles array
        .catch(error => console.log('Error fetching data:', error));
    }, [finalFrom,finalTo,finalQuery,finalSource]);
     
    console.log(newsData.publishedAt);
    console.log(newsData.source);
  return (
    <div class="bg-slate-900 w-screen h-screen text-white overflow-auto">
     <Header></Header>
     <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
     {newsData.map((article, index) => (
        <NCard
          key={index}
          title={article.title}
          description={article.description}
          imageUrl={article.urlToImage}
          articleUrl={article.url}
          author={article.author}
          date={article.publishedAt}

        />
      ))}

     </div>
   
    </div>
  )
}

export default Home