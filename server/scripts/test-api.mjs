import axios from 'axios';

async function testModuleAPI() {
  try {
    // Login first
    console.log('1. Logging in...');
    const loginRes = await axios.post('http://localhost:4000/api/login', {
      username: 'student_demo',
      password: 'password123'
    });
    
    const token = loginRes.data.token;
    console.log('✅ Logged in, token received\n');

    // Get learning path
    console.log('2. Getting learning path...');
    const pathRes = await axios.get('http://localhost:4000/api/learning-path', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log(`✅ Path received with ${pathRes.data.modules?.length || 0} modules\n`);
    
    if (pathRes.data.modules && pathRes.data.modules.length > 0) {
      const firstModule = pathRes.data.modules[0];
      console.log(`3. Loading first module: ${firstModule.title} (ID: ${firstModule.id})\n`);
      
      const moduleRes = await axios.get(`http://localhost:4000/api/module/${firstModule.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('✅ Module loaded!');
      console.log(`   Title: ${moduleRes.data.title}`);
      console.log(`   Items: ${moduleRes.data.items?.length || 0}`);
      
      if (moduleRes.data.items && moduleRes.data.items.length > 0) {
        console.log('\n   First 3 items:');
        for (let i = 0; i < Math.min(3, moduleRes.data.items.length); i++) {
          const item = moduleRes.data.items[i];
          console.log(`   ${i + 1}. ${item.title || 'No title'}`);
          console.log(`      Has question: ${!!item.question ? 'YES' : 'NO'}`);
          if (item.question) {
            console.log(`      Question: ${item.question.text.substring(0, 60)}...`);
          }
        }
      } else {
        console.log('\n   ❌ NO ITEMS in module response');
      }
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testModuleAPI();
