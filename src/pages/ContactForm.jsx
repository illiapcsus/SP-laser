import {GiLaserPrecision} from 'react-icons/gi';
import {useState} from 'react';
//Import the functions you need from the SDKs you need
// eslint-disable-next-line no-unused-vars
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import {doc, setDoc, addDoc, collection, getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRGD42qYfcoahaW-THL9ZrkDP1GV9kbsQ",
  authDomain: "laserengraving-9a35a.firebaseapp.com",
  projectId: "laserengraving-9a35a",
  storageBucket: "laserengraving-9a35a.appspot.com",
  messagingSenderId: "846011134281",
  appId: "1:846011134281:web:9c108178f7f7ad45fcea98",
  measurementId: "G-6LSR5R581F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export const db = getFirestore(app);
export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    userPhone: '',
    orderDescription: '',
  });

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // log the submitted form data
    console.log('Submitted Form Data:', formData);

    const docRef=await addDoc(collection(db, "orders"), formData);

 setFormData({
      firstName: '',
      lastName: '',
      userEmail: '',
      userPhone: '',
      orderDescription: '',
    });
    console.log('Order submitted successfully!');
  };
  return (
      <div className="flex flex-col items-center min-h-screen">
        {/* Title Section */}
        <div className="flex flex-col items-center p-8">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-600 flex items-center gap-2">
            <GiLaserPrecision className="text-red-400"/>
            Order Form
          </h1>
          <h2 className="text-lg font-light">Let me know what you want to create</h2>
        </div>

        {/* Form Section */}
        <form
            className="flex flex-col w-full max-w-lg p-4 items-start gap-3"
            onSubmit={handleSubmit}
            noValidate
        >
          {/* Name Input Fields */}
          <div className="flex w-full gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="fname" className="text-neutral-600">First Name</label>
              <input
                  id="firstName"
                  className="shadow rounded-lg border-slate-300 h-12 p-2 bg-neutral-100"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="lname" className="text-neutral-600">Last Name</label>
              <input
                  id="lastName"
                  className="shadow rounded-lg border-slate-300 h-12 p-2 bg-neutral-100"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
              />
            </div>
          </div>

          {/* Email Input Field */}
          <div className="flex flex-col w-full">
            <label htmlFor="user-email" className="text-neutral-600">Email</label>
            <input
                id="userEmail"
                className="shadow rounded-lg border-slate-300 h-12 p-2 bg-neutral-100"
                type="email" // Changed to 'email' type for proper validation
                placeholder="johndoe2022@gmail.com"
                value={formData.userEmail}
                onChange={handleChange}
                required
            />
          </div>

          {/* Phone Number Input Field */}
          <div className="flex flex-col w-full">
            <label htmlFor="user-phone" className="text-neutral-600">Phone Number</label>
            <input
                id="userPhone"
                className="shadow rounded-lg border-slate-300 h-12 p-2 bg-neutral-100 placeholder:italic"
                type="tel" // Changed to 'tel' type for proper validation
                placeholder="(###) ###-####"
                value={formData.userPhone}
                onChange={handleChange}
                required

            />
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col w-full">
            <label htmlFor="order-description" className="text-neutral-600">Describe It</label>
            <textarea
                id="orderDescription"
                className="shadow rounded-lg border-slate-300 bg-neutral-100 p-1.5"
                rows="5" // Adjusted for better default size
                placeholder="Provide a detailed description..."
                value={formData.orderDescription}
                onChange={handleChange}
                required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full rounded-lg bg-neutral-800 py-1 text-lg font-light text-neutral-300">
            Submit
          </button>
        </form>
      </div>
  );
};
