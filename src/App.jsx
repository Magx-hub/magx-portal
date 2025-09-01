// App.jsx
import Navigation from './Navigation';

const App = () => {
  return (
    <div>
      <Navigation />
      {/* Rest of your app content */}
    </div>
  );
};

export default App;



// // Demo component showing usage
// import React from 'react';
// import { Feature } from './components/Feature';


// const App = () => {
//   const StarIcon = () => (
//     <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
//       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//     </svg>
//   );

//   const HeartIcon = () => (
//     <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
//       <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//     </svg>
//   );

//   const LightBulbIcon = () => (
//     <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
//       <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 6.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
//     </svg>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="mx-auto max-w-6xl">
//         <h1 className="mb-8 text-3xl font-bold text-gray-900">Card Component Demo</h1>
        
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           <Feature 
//             icon={<StarIcon />} 
//             title="Premium Quality"
//           >
//             Experience the finest craftsmanship with our premium quality products designed to exceed your expectations.
//           </Feature>
          
//           <Feature 
//             icon={<HeartIcon />} 
//             title="Customer Love"
//           >
//             Join thousands of satisfied customers who trust our brand for reliable and exceptional service.
//           </Feature>
          
//           <Feature 
//             icon={<LightBulbIcon />} 
//             title="Innovation"
//           >
//             Stay ahead with our cutting-edge solutions that bring fresh ideas to life through innovative technology.
//           </Feature>
//         </div>

//         <div className="mt-12">
//           <h2 className="mb-6 text-2xl font-semibold text-gray-900">Other Card Variations</h2>
          
//           <div className="grid gap-6 md:grid-cols-2">
//             <Card color="white" shadow={true}>
//               <CardBody>
//                 <Typography variant="h5" color="blue-gray" className="mb-2">
//                   Standard Card
//                 </Typography>
//                 <Typography className="text-gray-600">
//                   This is a standard card with white background and shadow.
//                 </Typography>
//               </CardBody>
//             </Card>
            
//             <Card color="gray" shadow={false}>
//               <CardBody>
//                 <Typography variant="h5" color="blue-gray" className="mb-2">
//                   Gray Card
//                 </Typography>
//                 <Typography className="text-gray-600">
//                   This is a gray card without shadow for a subtle appearance.
//                 </Typography>
//               </CardBody>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;










