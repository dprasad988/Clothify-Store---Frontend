import React from 'react'
import CategorySection from './components/category-section'
import ImageSlider from './components/slider'
import NewArrivals from './components/new-arrivals'
import BrandingSection from './components/our-brandings'
import OurBranches from './components/our-branches'
import ShoppingFeatures from './components/shopping-features'
import TrendingProducts from './components/trending-now'

function Home() {
  return (
    <div>
      <ImageSlider/>
      <ShoppingFeatures/>
      <CategorySection/>
      <TrendingProducts/>
      <NewArrivals />
      <BrandingSection/>
      <OurBranches/>
    </div>
  )
}

export default Home
