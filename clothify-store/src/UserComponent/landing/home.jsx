import React from 'react'
import CategorySection from './components/category-section'
import ImageSlider from './components/slider'
import NewArrivals from './components/new-arrivals'
import BrandingSection from './components/our-brandings'

function Home() {
  return (
    <div>
      <ImageSlider/>
      <CategorySection/>
      <NewArrivals />
      <BrandingSection/>
    </div>
  )
}

export default Home
