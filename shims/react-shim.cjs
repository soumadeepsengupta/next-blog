const path = require('path');
// Load the real react package by absolute path to avoid alias recursion
const realReactPath = path.resolve(__dirname, '..', 'node_modules', 'react');
const React = require(realReactPath);

if (!React.useEffectEvent) {
  React.useEffectEvent = function useEffectEvent(handler) {
    const { useRef, useEffect, useCallback } = React;
    const ref = useRef(handler);
    useEffect(() => {
      ref.current = handler;
    }, [handler]);
    return useCallback((...args) => {
      return ref.current?.(...args);
    }, []);
  };
}

module.exports = React;
module.exports.useEffectEvent = React.useEffectEvent;
