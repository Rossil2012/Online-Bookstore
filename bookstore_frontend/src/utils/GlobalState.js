function State() {
    this.state = [];
    this.state['isAdmin'] = false;
    this.state['url'] = 'http://localhost:8080';
    this.set = (key, value) => {
        this.state[key] = value;
    };

    this.get = (key) => {
        return this.state[key];
    }
}

export const GlobalState = new State();