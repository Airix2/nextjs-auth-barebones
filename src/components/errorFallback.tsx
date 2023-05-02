import React from "react";
import { FallbackProps } from "react-error-boundary";
import MainLayout from "./mainlayout";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	// Call resetErrorBoundary() to reset the error boundary and retry the render.

	return (
		<MainLayout>
			<div role="alert">
				<p>Something went wrong:</p>
				<pre style={{ color: "red" }}>{error.message}</pre>
			</div>
		</MainLayout>
	);
};

export default ErrorFallback;
