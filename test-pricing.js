// Test script to demonstrate dynamic pricing
// This simulates what happens when the frontend fetches car data

async function testPricing() {
  console.log('🔄 Testing dynamic pricing...\n');

  try {
    // Fetch cars from API (same as frontend)
    const response = await fetch('http://localhost:3000/api/cars');

    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }

    const cars = await response.json();

    console.log('📊 Current car pricing:');
    cars.forEach(car => {
      console.log(`  ${car.model}: $${car.price}/day`);
    });

    // Find Cybertruck pricing
    const cybertruck = cars.find(car => car.model === 'Cybertruck 2024');
    if (cybertruck) {
      console.log(`\n🚗 Cybertruck price: $${cybertruck.price}/day`);

      // Calculate sample rental price (3 days)
      const rentalDays = 3;
      const totalPrice = rentalDays * cybertruck.price;
      console.log(`💰 3-day rental would cost: $${totalPrice}`);
    }

    console.log('\n✅ Pricing fetched dynamically from database!');
    console.log('💡 No code deploy needed - just update via CRM API');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPricing();