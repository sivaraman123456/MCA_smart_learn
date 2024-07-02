// import { responsiveFontSizes } from '@mui/material';
// import './Home.css';
// import React from 'react'
// const Home = () => {
//  const styles = {

//       fontWeight: 'bold',
//       color: 'transparent',
//       background: 'linear-gradient(to right, #6B46C1, #B794F4)',
//       WebkitBackgroundClip: 'text',
      
//     };
//   return (
//   <>
//   <div className="signup">
//     <a href='/login'>Sign In</a>
//   </div>
//    <div className='header'>
//             <div className='header-contents'>
//                 <h2>Empower  Your Future with <span style={styles} className="coding-skills"  >Coding Skills</span></h2>
//                 <p>With our online  coding notes, you can learn at your own place, from anywhere in the world, and get access to a wealth of resources, including MCA subject notes in semester wise,you can download </p>
//     </div>
//         </div>
//         </>
//   )
// }
// export default Home

import React from 'react';
import './Home.css';

const Home = () => {
  const styles = {

    fontWeight: 'bold',
    color: 'transparent',
    background: 'linear-gradient(to right, #6B46C1, #B794F4)',
    WebkitBackgroundClip: 'text',
    
  };
  return (
    <>
      <div className="signup">
        <a href='/login'>Sign In</a>
      </div>
      <div className="title">
          <h3 >MCA SMART LEARN </h3>
        </div>
      <div className='header'>
       
        <div className='header-contents'>
          <h2>Empower Your Future with <span style={styles} className="coding-skills">Coding Skills</span></h2>
          <p>With our online coding notes, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including MCA subject notes in semester-wise, which you can download.</p>
        <a href="/login"> <button>Get Started</button></a> 
        </div>
      </div>
    </>
  );
}

export default Home;

