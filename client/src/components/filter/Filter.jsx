import './filter.scss';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({
        city: searchParams.get('city') || '',
        type: searchParams.get('type') || '',
        property: searchParams.get('property') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        bedroom: searchParams.get('bedroom') || '',
    });

    const handleChange = e => {
        setQuery(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setSearchParams(query);
    };

    return (
        <div className="filter">
            <h1>
                Search results for <b>{query.city}</b>
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="top">
                    <div className="item">
                        <label htmlFor="city">Location</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City Location"
                            onChange={handleChange}
                            value={query.city}
                        />
                    </div>
                </div>
                <div className="bottom">
                    <div className="item">
                        <label htmlFor="type">Type</label>
                        <select
                            name="type"
                            id="type"
                            onChange={handleChange}
                            value={query.type}
                        >
                            <option value="">any</option>
                            <option value="buy">Buy</option>
                            <option value="rent">Rent</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="property">Property</label>
                        <select
                            name="property"
                            id="property"
                            onChange={handleChange}
                            value={query.property}
                        >
                            <option value="">any</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="minPrice">Min Price</label>
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            placeholder="any"
                            onChange={handleChange}
                            value={query.minPrice}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="maxPrice">Max Price</label>
                        <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            placeholder="any"
                            onChange={handleChange}
                            value={query.maxPrice}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="bedroom">Bedroom</label>
                        <input
                            type="number"
                            id="bedroom"
                            name="bedroom"
                            placeholder="any"
                            onChange={handleChange}
                            value={query.bedroom}
                        />
                    </div>
                    <button type="submit">
                        <img src="/search.png" alt="" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Filter;
