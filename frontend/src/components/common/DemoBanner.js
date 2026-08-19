import React from 'react'

// Portfolio notice shown on every page. Two wordings are rendered and the
// stylesheet picks one by viewport width, so narrow screens get a short
// message instead of a truncated long one.
const DemoBanner = () => (
  <div className="demo-banner" role="note">
    <span className="demo-banner-badge">Demo</span>
    <span className="demo-banner-text">
      <span className="demo-banner-long">
        Portfolio rebuild of a former live shop &mdash; orders, payments and emails are <span className="demo-banner-accent">not real</span>.
      </span>
      <span className="demo-banner-short">
        Portfolio demo &mdash; <span className="demo-banner-accent">not a real shop</span>.
      </span>
    </span>
  </div>
)

export default DemoBanner
