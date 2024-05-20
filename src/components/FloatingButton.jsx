import React from 'react';
import './FloatingButton.css';

const FloatingButton = React.memo(({ onClick }) => {
  return (
    <div className="floating-button" onClick={onClick}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" fill="#007bff" />
        <path
          d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-2.97 0-5.67 1.16-7.78 3.22C1.16 7.33 0 10.03 0 13s1.16 5.67 3.22 7.78C5.33 22.84 8.03 24 11 24s5.67-1.16 7.78-3.22C22.84 18.67 24 15.97 24 13s-1.16-5.67-3.22-7.78C17.67 1.16 14.97 0 12 0zm0 22c-2.65 0-5.2-1.03-7.07-2.93C2.03 17.2 1 14.65 1 12s1.03-5.2 2.93-7.07C6.8 2.03 9.35 1 12 1s5.2 1.03 7.07 2.93C21.97 6.8 23 9.35 23 12s-1.03 5.2-2.93 7.07C17.2 20.97 14.65 22 12 22z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
});

export default FloatingButton;
