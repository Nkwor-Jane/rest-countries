import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

export default function Filter() {

    const options = [
        { key: 'all', text: 'All', value: 'all' },
        { key: 'africa', text: 'Africa', value: 'africa' },
        { key: 'america', text: 'America', value: 'america' },
        { key: 'asia', text: 'Asia', value: 'asia' },
        { key: 'europe', text: 'Europe', value: 'europe' },
        { key: 'oceania', text: 'Oceania', value: 'oceania' },
      ]
    return (
        <div className="dropdown">
                {/* <select
                    onChange={(e) => {
                        setSelectParam(e.target.value);
                    }}
                    aria-label="Filter Countries By Region"
                >
                    <option value="All">Filter By Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select> */}

                <Menu compact>
                    <Dropdown text='Filter by Region' options={options} simple item/>
                </Menu>



        </div>
    )
}
