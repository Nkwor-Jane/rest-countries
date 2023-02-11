import React, {useState, useEffect} from 'react';
import { Button, Icon,Image } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import LoadCountries from './LoadCountries';
import './App.css'

export default function EachCountry() {
    const [currentData, setCurrentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [borderCountry, setBorderCountry] = useState([]);
    let {name} = useParams();

    useEffect(() =>{
        const getCountry = async (name) =>{
                const baseURL = `https://restcountries.com/v2/name/${name}`;
                const response = await fetch(baseURL);
                const data = await response.json();
                setCurrentData(data[0]);
                data[0]?.borders?.forEach((border) =>{
                    return findBorder(border)
                })
                setIsLoading(false);
        };
        getCountry(name);
        const findBorder = async (border) =>{
            const baseURL = `https://restcountries.com/v2/alpha/${border}`;
                const response = await fetch(baseURL);
                const data = await response.json();
                setBorderCountry((curr) => [...curr, data.name]);
        }
    },[name])
    
  return (
    <div className='sec-wrapper'>
        <button className='sec-btn '>
            <Link to ={-1} style={{color: "#e5e5e5"}}>
            <Icon name="arrow left" style={{paddingRight: "5px", color: "white"}}/>
            Back
            </Link>
        </button>
        <div >
        {isLoading ? (
                <LoadCountries/>
            ):(
            <div>
                <div className="sec-block">
                    <Image src={currentData.flag} className='sec-img' /> 
                    <div className='sec-seperate'>
                        <div className="sec-seperate-2">
                            <div>
                                <h2 style={{fontSize: "3rem"}}>{" "}{currentData.name}</h2>
                                <p><span className='em'>Native Name:</span>{"  "}{currentData.nativeName}</p>
                                <p><span className='em'>Population:</span>{"  "} {currentData.population.toLocaleString()}</p>
                                <p><span className='em'>Region:</span>{"  "} {currentData.region}</p>
                                <p><span className='em'>Sub Region:</span>{"  "}{currentData.subregion}</p>
                                <p><span className='em'>Capital:</span>{"  "}{currentData.capital}</p>
                            </div>
                            <div className='sec-sep-2'>
                                <p><span className='em'>Top Level Domain:</span> {" "}{currentData.topLevelDomain}</p>
                                <p><span className='em'>Currencies:</span> {"  "}{currentData.currencies[0].name}</p>
                                <p><span className='em'>Languages:</span>{"  "}{currentData.languages[0].name}</p>
                            </div> 
                        </div>

                        <div className='sec-border'>
                        <p><span className='em'>Border Countries:</span>{"  "}</p>
                            {borderCountry?.length ? (
                                borderCountry.map((border, index) =>(
                                <Link
                                        key ={index}
                                        to={`/${border}`}
                                >
                                    <Button secondary style={{margin: "5px"}}>{border}</Button>
                                </Link>
                            ))
                        ):(
                            <p>No Borders.....</p>
                         )}
                        </div>
                    </div>
                </div>
             
         </div>
          )}
        </div>
    </div>
  )
}
