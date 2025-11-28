import React, { useEffect, useState } from 'react';

const Owners: React.FC = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/owners')
      .then(response => response.json())
      .then(data => setOwners(data))
      .catch(error => console.error('Error fetching owners:', error));
  }, []);

  return (
    <div>
      <h1>Owners</h1>
      <ul>
        {owners.map((owner: any) => (
          <li key={owner.id}>{owner.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Owners;
