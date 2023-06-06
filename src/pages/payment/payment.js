import React, { useState } from "react";
import { FakeStoreApi } from "../../services/fake-store-api";
import "./payment.css";

const Payment = ({ userId }) => {
  const [name, setName] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('');
  return (
    <>
      <form onSubmit={(e)=>{
        e.preventDefault();
        FakeStoreApi.saveAddress({
          addressLine: addressLine,
          addressState: state,
          addressCity: city,
          addressPinCode: pinCode,
          addressCountry: country,
          userId : 1,
        });
      }}>
        <label for="fname">Name:</label>
        <br />
        <input type="text" id="name" name="name" value={name} onChange={e=>setName(e.target.value)} />
        <br />
        <label for="addressLine">Address line:</label>
        <br />
        <input type="text" id="addressLine" name="addressLine" value={addressLine} onChange={e=>setAddressLine(e.target.value)} />
        <br />
        <label for="city">City:</label>
        <br />
        <input type="text" id="city" name="city" value={city} onChange={e=>setCity(e.target.value)} />
        <br />
        <label for="state">State:</label>
        <br />
        <input type="text" id="state" name="state" value={state} onChange={e=>setState(e.target.value)} />
        <br />
        <label for="pinCode">Pin code:</label>
        <br />
        <input type="text" id="pinCode" name="pinCode" value={pinCode} onChange={e=>setPinCode(e.target.value)} />
        <br />
        <label for="country">Country:</label>
        <br />
        <input type="text" id="country" name="country" value={country} onChange={e=>setCountry(e.target.value)} />
        <br />
        <br />
        <button type="submit" value="Submit">Submit</button>
      </form>
    </>
  );
};

export { Payment };
    