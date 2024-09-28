import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      {/* Nội dung của Header sẽ được thêm vào sau */}
    </header>
  );
};


const styles = {
  header: {
    border: '1px solid black', 
    height: '60px',            
  },
};

export default Header;
