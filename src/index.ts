
import { initializeApp } from './app';

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    console.log('TypeScript website loaded!');
});

// Example TypeScript component
class WelcomeMessage {
    constructor(private message: string) {}
    
    display(): void {
        const element = document.getElementById('welcome');
        if (element) {
            element.textContent = this.message;
        }
    }
}

const welcome = new WelcomeMessage('Hello from TypeScript!');
welcome.display();