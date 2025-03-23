import React from 'react';
import Header from './components/Header';
import SplitForm from './components/SplitForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <SplitForm />
      <Footer />
    </div>
  );
}
