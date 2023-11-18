import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  name = "ErrorBoundary";

  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
    console.warn("The above error was caught by an ErrorBoundary.", {
      props: this.props,
    });
    this.setState({ error, errorInfo });
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <h1>Sorry, something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function withErrorBoundary<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  // eslint-disable-next-line react/display-name
  return (props: T) => (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
}

export default withErrorBoundary;
