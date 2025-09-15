import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 text-red-600">
                    <h2 className="text-xl font-bold">Something went wrong</h2>
                    <p>Status Code: 500</p>
                    <p>{this.state.error?.message || 'An unexpected error occurred. Please try again later.'}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
