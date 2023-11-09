import  { useState } from 'react';
import './App.css'

import PostalInput from './componets/PostalInput';
import MapComponent from './componets/MapComponent';

const App = () => {
  const [postalCode, setPostalCode] = useState('');

  const handlePostalCodeChange = (code) => {
    setPostalCode(code);
  };

  return (
    <div className='app'>
      <PostalInput onPostalCodeChange={handlePostalCodeChange} />
      {postalCode && <MapComponent postalCode={postalCode} />}
    </div>
  );
};

export default App;
