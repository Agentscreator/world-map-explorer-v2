import pa11y from 'pa11y';
import { spawn } from 'child_process';

const PORT = 3001;
let serverProcess;

async function startServer() {
  return new Promise((resolve, reject) => {
    serverProcess = spawn('node', ['server.js'], {
      env: { ...process.env, PORT },
    });

    serverProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Server running')) {
        resolve();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`Server error: ${data}`);
    });

    setTimeout(() => reject(new Error('Server start timeout')), 10000);
  });
}

function stopServer() {
  if (serverProcess) {
    serverProcess.kill();
  }
}

async function runAccessibilityTests() {
  try {
    console.log('Starting server for accessibility tests...');
    await startServer();

    console.log('Running pa11y accessibility tests...');
    const results = await pa11y(`http://localhost:${PORT}`, {
      standard: 'WCAG2AA',
      includeWarnings: true,
      includeNotices: false,
    });

    console.log('\n=== Accessibility Test Results ===\n');
    
    if (results.issues.length === 0) {
      console.log('✓ No accessibility issues found!');
    } else {
      console.log(`Found ${results.issues.length} accessibility issues:\n`);
      results.issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.type.toUpperCase()}: ${issue.message}`);
        console.log(`   Code: ${issue.code}`);
        console.log(`   Selector: ${issue.selector}`);
        console.log(`   Context: ${issue.context}\n`);
      });
    }

    stopServer();
    process.exit(results.issues.filter(i => i.type === 'error').length > 0 ? 1 : 0);
  } catch (error) {
    console.error('Accessibility test failed:', error);
    stopServer();
    process.exit(1);
  }
}

runAccessibilityTests();
