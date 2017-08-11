import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default class Shipping extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      country: '',
      region: ''
    };
  }

  selectCountry (val) {
    this.setState({ country: val });
  }

  selectRegion (val) {
    this.setState({ region: val });
  }

  render () {
    const { country, region } = this.state;
    return (
      <div className="shipping-form">
        <br />
        <div className="country-dropdown">
          <CountryDropdown
            classes="dropdown"
            value={country}
            onChange={(val) => this.selectCountry(val)} />
          <br />
          <RegionDropdown
            classes="dropdown"
            country={country}
            value={region}
            onChange={(val) => this.selectRegion(val)} />
          <br />
        </div>

        <div>
          <label>
            <input type="text" placeholder="City" value="" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Zip/Postal Code" value="" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Street Address" value="" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Street Address (Cont.)" value="" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="First Name" value="" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Last Name" value="" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Email Address" value="" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Phone Number" value="" />
          </label>
        </div>
      </div>
    );
  }
}


// City
// Zip/Postal
// Address Line 1
// Address Line 2
// First
// Last
// Email
// Phone
