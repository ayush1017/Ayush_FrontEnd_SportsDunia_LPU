import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase/firebase.config';
import { useSearch } from './context';

function Header() {
  const navigate = useNavigate();
  const { query, updateQuery } = useSearch();
  const { frm, updatefrm } = useSearch();
  const { td, updatd } = useSearch();
  const {srcc,updatesrcc}=useSearch();
  const [search, setSearch] = useState(query);
  const [isMenu, setIsMenu] = useState(false);
  const [isAuthorFilter, setIsAuthorFilter] = useState(false);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [author, setAuthor] = useState(query);
  const [dateFrom, setDateFrom] = useState(frm);
  const [dateTo, setDateTo] = useState(td);
  const [isNews,setisNews]=useState(false);
  const [News,setNews]=useState(srcc);

  // Sign out function
  const out = () => {
    const fireauth = getAuth(app);
    fireauth.signOut().then(() => {
      console.log('Signed out');
      window.localStorage.setItem("auth", "false");
      navigate('/login', { replace: false });
    }).catch((err) => {
      console.log(err);
    });
  };

  // Handle search button click
  const handleSearch = () => {
    updateQuery(search);
    console.log('Search Value:', search);
  };

  // Show filter inputs based on the selection
  const showFilters = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'Author') {
      setIsMenu(true);
      setIsAuthorFilter(true);
      setIsDateFilter(false);
      setisNews(false);
    } else if (selectedOption === 'Date') {
      setIsMenu(true);
      setIsDateFilter(true);
      setIsAuthorFilter(false);
      setisNews(false);
    } else if (selectedOption === 'News'){
      setisNews(true);
      setIsMenu(true);
      setIsDateFilter(false);
      setIsAuthorFilter(false);

    }else{
        setIsAuthorFilter(false);
      setIsDateFilter(false);
      setisNews(false);

    }
  };

  // Handle the Author filter
  const filterByAuthor = () => {
    updateQuery(author);
    setIsMenu(false);
  };

  // Handle the Date filter
  const filterByDate = () => {
    updatefrm(dateFrom);
    updatd(dateTo);
    setIsMenu(false);
  };
  const filterByNews = () => {
    updatesrcc(News);
    setIsMenu(false);
  };

  return (
    <div className="bg-white w-screen  text-black font-medium sticky top-0 overflow-auto">
      <div className="flex items-center gap-5 px-3 py-3 sm:flex-1">
        <div className="text-white  bg-slate-900 rounded-md p-2">
          <NavLink to="/Home">Home</NavLink>
        </div>
        
        {/* Search Input */}
        <input
          class="py-2 px-1"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="text-white  bg-slate-900 rounded-md p-2" onClick={handleSearch}>Search</button>

        <NavLink  className="text-white  bg-slate-900 rounded-md p-2"to="/Payouts">Payout Calculator</NavLink>
        <NavLink className="text-white  bg-slate-900 rounded-md p-2"to="/NewsAnalytics">Analytics</NavLink>

        {/* Filter Dropdown */}
        <div>
          <select id="filter" onChange={showFilters}>
            <option>Filter</option>
            <option>Author</option>
            <option>Date</option>
            <option>News</option>
          </select>
        </div>

        {/* Author Filter */}
        {isAuthorFilter && (
          <>
            <input
              type="text"
              placeholder="Enter Author Name"
            //   value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <button className="text-white  bg-slate-900 rounded-md p-2"onClick={filterByAuthor}>Search</button>
          </>
        )}

        {/* Date Filter */}
        {isDateFilter && (
          <>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            to
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
            <button className="text-white  bg-slate-900 rounded-md p-2"onClick={filterByDate}>Search</button>
          </>
        )}
        {isNews && (
          <>
            <input
              type="text"
              placeholder="Enter "
              onChange={(e) => setNews(e.target.value)}
            />
            <button className="text-white  bg-slate-900 rounded-md p-2"onClick={filterByNews}>Search</button>
          </>
        )}

        {/* Logout Button */}
        <div className="flex items-center ml-auto cursor-pointer gap-2 relative " onClick={out}>
            <div className="text-white  bg-slate-900 rounded-md p-2">
                Logout
            </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
