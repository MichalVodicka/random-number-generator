import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            msg:
                this.props.msg === undefined ? 'something went wrong:-(' : this.props.msg
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true ,
        msg: error};
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>{this.state.msg}</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary
