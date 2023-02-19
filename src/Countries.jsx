import React, {useState, useEffect, useContext} from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {motion} from "framer-motion";
import {useCountryContext} from './context/COUNTRYCONTEXT'
import LoadCountries from './LoadCountries';
import './App.css';
import "./select.css";
import {ThemeContextWrapper}  from './theme/ThemeWrapper';
import Error from './Error';

export default function Countries() {
    const {apiData,error, loading} = useCountryContext();
    const [searchInput, setSearchInput] = useState('');
    const [scrollBtn, setScrollBtn] = useState(false);
    const [filterRegion, setFilterRegion] = useState("");


    const theme = useContext(ThemeContextWrapper);
    const darkMode = theme.state.darkMode;

    useEffect(()=>{
        //button will be displayed after scrolling for 300 pixels
        const handleScrollVisibility = () =>{
            window.pageYOffset > 300 ? setScrollBtn(true) : setScrollBtn(false)
        };
        window.addEventListener('scroll', handleScrollVisibility);
        return() =>{
            window.removeEventListener('scroll', handleScrollVisibility)
        };
    }, [])

    const data = Object.values(apiData);
    const filter_items = [...new Set(data.map((item) => item.region))];
    const search_params = Object.keys(Object.assign({}, ...data));
    
    const searchItems = (items) =>{
        return items.filter((item) =>
           item.region.includes(filterRegion) &&
            search_params.some((params) => 
                item[params]?.toString().toLowerCase().includes(searchInput.toLowerCase())
           )
        ); 
    }
   
    const handleScrollToTop =() =>{
         window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  
    if (error) {
        return <Error/>
    } else if (loading) {
        return <LoadCountries/>;
    } else {  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
        <div style={{padding: 20}}>
        <div className='second-grid'>
            <div className="search-wrapper">
                <svg className= "search-icon" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z" fillRule="nonzero"/></svg>
                    <input 
                    type='search' 
                    placeholder='Search for a country...'
                    onChange={(e) => setSearchInput(e.target.value)}
                    className={`search ${darkMode ? "search-dark" : "light"}`}
                    aria-label="Search for a country"
                />
            </div>
             <select
                onChange={(e) => setFilterRegion(e.target.value)}
                className={`select-dropdown ${darkMode ? "select-dark" : "light"}`}
                aria-label="Filter Countries By Region"
            >
                <option value="Filter by Region" className='select-dropdown__option'>Filter By Region</option>
                {filter_items.map((item) => (
                    <option value={item} className='select-dropdown__option'>Filter By {item}</option>
                ))}
            </select>
        </div>

            <div style={{marginTop:"2rem"}} className='card-wrapper' >
                    {searchItems(data).map((item,id) => (
                        // const {flags, population, region, capital, name, index} = item;
                         <Link  key={item.id}  to ={`/${item.name}`}> 
                         <motion.div
                             initial={{
                                 opacity: 0,
                                 translateX: -500,
                                 rotate: 10,
                             }}
                             animate={{
                                 opacity:1,
                                 translateX:0,
                                 rotate:0,
                             }}
                             transition={{
                                 delay: id * 0.02,
                             }}
                             whileHover={{
                                 translateY: -10,
                             }}
                         >

                         <div key={item.id} className={`card ${darkMode ? "card-dark" : "card-light"}`}>
                            <div className={`image-wrapper ${darkMode ? "dark" : "light"}`}>
                                <img className="image" src={item.flags.png}/>
                            </div>
                         <div className={`card-content ${darkMode ? "card-dark" : "card-light"}`}>
                             <h2 style={{padding: "10px", fontWeight: "900"}}>{item.name}</h2>
                             <p>
                             <span>Population:</span> {" "}
                                 {item.population.toLocaleString()}
                             </p>
                             <p>
                             <span>Region:</span>
                             {" "}   {item.region}    
                             </p>            
                             <p>
                                <span>Capital:</span>{" "}
                                 {item.capital}
                             </p>  
                         </div>
                     </div>
                     </motion.div>
                     </Link>
                    ))}
                </div>
        </div>

        {/* 👇️ scroll to top on button click */}
        {scrollBtn && (
          <Button circular icon='angle double up' onClick={handleScrollToTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            padding: '20px',
          }}/>
        )}
    </div>
  )
}
}