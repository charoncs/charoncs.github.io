export function initializeApp(): void {
    // Your app initialization logic here
    console.log('App initialized');
    
    // Example: Add interactive functionality
    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', () => {
            alert('Button clicked from TypeScript!');
        });
    }
}