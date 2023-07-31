import AddOnsItems from "./AddOnsItems";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import React, { useState, useEffect } from 'react';
import './postpaidPlans.css';

const AddOns = () => {
    const [addons, setAddons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        loadAddons();
        checkUserRole();
    }, []);

    const loadAddons = async () => {
        try {
            const res = await axios.get('http://localhost:8080/admin/getAddon');
            setAddons(res.data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log('Error occurred while loading addons:', error);
        }
    };

    const checkUserRole = () => {
        const storedCredentials = localStorage.getItem('credentials');
        if (!storedCredentials) {
            setUserRole(null);
        } else {
            const loggedUserData = JSON.parse(storedCredentials);
            setUserRole(loggedUserData.userRole);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    let filteredAddons = [];

    if (Array.isArray(addons)) {
        filteredAddons = addons.filter((addon) => {
            const searchTermLowerCase = searchTerm.toLowerCase();
            const addonNameLowerCase = addon.addonName.toLowerCase();
            const addonPriceString = addon.addonPrice.toString();

            return (
                addonNameLowerCase.includes(searchTermLowerCase) ||
                addonPriceString.includes(searchTermLowerCase)
            );
        });
    }

    const handleAddOns = () => {
        window.location.href = '/admin/AddAddOns';
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred while loading addons.</div>;
    }

    if (userRole === 'admin') {
        return (
            <div>
            <AdminNavBar></AdminNavBar>
            <div style={{ paddingTop: "100px" }}>
            <div>
                <div className="search-bar">
                    <div className="grid-3">
                        <button className='add_plan' onClick={handleAddOns}>
                            {/* <FontAwesomeIcon icon={faCirclePlus} flip /> */}
                            Add Plan
                        </button>
                    </div>
                    <div className="grid-6">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search plans..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="grid-3">
                        {/* <button>Search</button> */}
                    </div>
                </div>

                <header>
                    <tr>
                        <th className='title1'>Plan Type</th>
                        <th className='title2'>Plan Name</th>
                        <th className='title3'>Plan Price</th>
                    </tr>
                </header>

                {filteredAddons.length === 0 ? (
                    <div className="no-plans-message">No AddOns Found.</div>
                ) : (
                    filteredAddons.map((addon) => (
                        <AddOnsItems
                            key={addon.addonId}
                            id={addon.addonId}
                            type="addon"
                            name={addon.addonName}
                            validity={addon.addonValidity}
                            details={addon.addonDetails}
                            offers={addon.addonOffers}
                            price={addon.addonPrice}
                        />
                    ))
                )}
            </div>
            </div>
            </div>
        
        );
    } else {
        return (
            <div>
                <h3>No access</h3>
            </div>
        );
    }
};

export default AddOns;
