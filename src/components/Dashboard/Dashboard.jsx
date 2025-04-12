import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Categories from '../Categories/Categories';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <Categories />
    </div>
  );
}

export default Dashboard;