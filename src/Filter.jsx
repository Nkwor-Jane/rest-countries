import {useState} from 'react';
import { Dropdown, Menu,Input} from 'semantic-ui-react';
import './App.css'
import {useCountryContext} from './context/COUNTRYCONTEXT';


export default function Filter(props) {
    const [filteredResults, setFilteredResults] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [activeRegion, setActiveRegion] = useState("");
    
    const options = [
        // { key: 'region', text: 'Filter By Region', value: 'region' },
        { key: 'all', text: 'All', value: 'all' },
        { key: 'africa', text: 'Africa', value: 'africa' },
        { key: 'america', text: 'America', value: 'america' },
        { key: 'asia', text: 'Asia', value: 'asia' },
        { key: 'europe', text: 'Europe', value: 'europe' },
        { key: 'oceania', text: 'Oceania', value: 'oceania' },
      ];
      const fetchRegion = async(regionName) =>{
        if (regionName === "all"){
            const baseURL = "https://restcountries.com/v2/all";
            const response = await fetch(baseURL);
            const data = await response.json();
            console.log(data)
            return setFilteredResults(data);
        }else{
            const baseURL = `https://restcountries.com/v2/region/${regionName}`;
            const response = await fetch(baseURL);
            console.log(response)
            const data = await response.json();
            console.log(data)
            return setFilteredResults(data);
        }
      }

      const addDropdown = () => {
        return isVisible ? setVisibility(false) : setVisibility(true);
      };
      const removeDropdown = () => {
        return isVisible ? setVisibility(false) : setVisibility(true);
      };

    return (
<>
           {/* <summary>
            {activeRegion === 'All' || !activeRegion
                ? "Filter by Region"
                : activeRegion
            }
           </summary> */}
           {/* {isVisible ? ( */}
                {/* // <select> */}
                {/* //     {options.map((option) =>{ */}
                {/* //         <option */}
                {/* //             onClick={() =>{
                //                 fetchRegion(option.value);
                //                 setActiveRegion(option.text)
                //                 removeDropdown();
                //             }}
                //             value={option.text}
                //             key={option.key}
                //         >
                //             {option.text}
                //         </option>
                //     })}
                // </select> */}
                <Menu
                    onChange ={(e) =>{
                        setFilteredResults(e.tagrget.value)
                    }}
                >
                    <Dropdown
                    simple item
                    options={options}
                    defaultValue={options[0].text}
                    key={options.value}
                    onClick={() =>{
                                fetchRegion(options.value);
                            }}
                    />
                </Menu>
        {/* //    ) : null} */}
        </>
    )
}
