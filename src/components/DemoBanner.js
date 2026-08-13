import React from 'react'
import '../css/DemoBanner.css'
import { isDemoMode } from '../api';

// Banner shown on the deployed build to make clear that responses are sample data
// rather than live model output. Renders nothing when the app is pointed at a real backend.
export default function DemoBanner() {
  if (!isDemoMode()) {
    return null;
  }

  return (
    <div className="demo-banner">
      <span className="demo-banner-tag">Demo</span>
      <span className="demo-banner-text">
        Responses on this deployment are sample data, not live model output.
        The full version, including document upload, runs against the Flask
        backend with an OpenAI API key.
      </span>
    </div>
  )
}
