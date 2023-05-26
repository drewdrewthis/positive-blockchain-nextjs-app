import dynamic from "next/dynamic";
import React from "react";

/**
 * Wrapper component for non-SSR rendering.
 * @param props - The component props.
 * @returns The wrapped component without SSR rendering.
 */
const NonSSRWrapper = (props: any) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
