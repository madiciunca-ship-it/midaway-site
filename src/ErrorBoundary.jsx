import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("🔥 Render error:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "system-ui", color: "#b42318" }}>
          <h2>Au apărut erori în render.</h2>
          <pre style={{
            whiteSpace: "pre-wrap",
            background: "#fff0f0",
            border: "1px solid #f3d2d2",
            padding: 12,
            borderRadius: 8
          }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
