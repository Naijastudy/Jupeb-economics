import React from "react";
import PropTypes from "prop-types";

function SkeletonBox({ width, height, borderRadius, style }) {
  return (
    <div style={{
      width: width || "100%",
      height: height || 16,
      borderRadius: borderRadius || 8,
      background: "linear-gradient(90deg, #1a2a1a 25%, #2a3a2a 50%, #1a2a1a 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      ...style,
    }} />
  );
}

export function QuestionSkeleton({ t }) {
  return (
    <div style={{
      background: t.bgCard,
      border: `1px solid ${t.border}`,
      borderRadius: 16,
      padding: "18px 16px",
      marginBottom: 14,
    }}>
      {/* Year tag */}
      <SkeletonBox width="80px" height={10}
        style={{ marginBottom: 14 }} />

      {/* Question text */}
      <SkeletonBox height={14}
        style={{ marginBottom: 8 }} />
      <SkeletonBox height={14} width="85%"
        style={{ marginBottom: 8 }} />
      <SkeletonBox height={14} width="70%"
        style={{ marginBottom: 20 }} />

      {/* Options */}
      {[1, 2, 3, 4].map(i => (
        <SkeletonBox key={i} height={44}
          borderRadius={10}
          style={{ marginBottom: 10 }} />
      ))}
    </div>
  );
}

export function CardSkeleton({ t }) {
  return (
    <div style={{
      background: t.bgCard,
      border: `1px solid ${t.border}`,
      borderRadius: 16,
      padding: "18px 16px",
      marginBottom: 14,
    }}>
      <SkeletonBox width="60%" height={18}
        style={{ marginBottom: 12 }} />
      <SkeletonBox height={12}
        style={{ marginBottom: 8 }} />
      <SkeletonBox height={12} width="80%"
        style={{ marginBottom: 8 }} />
      <SkeletonBox height={12} width="65%" />
    </div>
  );
}

export function HomeCardSkeleton() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
    }}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <SkeletonBox key={i} height={120}
          borderRadius={16} />
      ))}
    </div>
  );
}

QuestionSkeleton.propTypes = {
  t: PropTypes.object.isRequired,
};

CardSkeleton.propTypes = {
  t: PropTypes.object.isRequired,
};
