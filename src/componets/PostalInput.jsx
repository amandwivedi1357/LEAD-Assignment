import  { useState } from 'react';
import './PostalInput.css'
const PostalInput = ({ onPostalCodeChange}) => {
  const [postalCode, setPostalCode] = useState('');

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onPostalCodeChange(postalCode);
  };

  const handleClearData = () => {
    setPostalCode('');
    onPostalCodeChange('');
  };
  return (<>
    <form onSubmit={handleFormSubmit} className='form-container glass-form '>
      <input
      className='glass-input'
        type="text"
        placeholder="Enter Postal Code"
        value={postalCode}
        onChange={handlePostalCodeChange}
      />
      <button className='glass-button' type="submit">Submit</button>
      <button className="glass-button" onClick={handleClearData}>
          Clear Data
        </button>
    </form>
    
    </>
  );
};

export default PostalInput;
