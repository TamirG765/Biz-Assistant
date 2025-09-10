// Configuration
const API_HOST = '127.0.0.1';
const API_PORT = '8000';
const BASE_URL = `http://${API_HOST}:${API_PORT}`;

// DOM elements
const healthCheckBtn = document.getElementById('healthCheck');
const healthResult = document.getElementById('healthResult');
const backendUrlSpan = document.getElementById('backendUrl');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    backendUrlSpan.textContent = BASE_URL;
});

// Health check function
async function checkHealth() {
    healthCheckBtn.disabled = true;
    healthCheckBtn.textContent = 'Checking...';
    
    // Hide previous result
    healthResult.classList.add('hidden');
    
    try {
        const response = await fetch(`${BASE_URL}/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add timeout
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Show success result
        healthResult.className = 'p-4 rounded-lg border text-sm bg-green-50 border-green-200 text-green-800';
        healthResult.innerHTML = `
            <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <strong>Success!</strong>
            </div>
            <div class="mt-1 font-mono">${JSON.stringify(data)}</div>
        `;
        healthResult.classList.remove('hidden');
        
    } catch (error) {
        // Show error result
        healthResult.className = 'p-4 rounded-lg border text-sm bg-red-50 border-red-200 text-red-800';
        healthResult.innerHTML = `
            <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <strong>Failed!</strong>
            </div>
            <div class="mt-1">
                Failed to reach backend at ${BASE_URL}/health<br>
                <span class="text-xs">${error.message}</span>
            </div>
        `;
        healthResult.classList.remove('hidden');
    } finally {
        healthCheckBtn.disabled = false;
        healthCheckBtn.textContent = 'Check backend health';
    }
}

// Event listeners
healthCheckBtn.addEventListener('click', checkHealth);