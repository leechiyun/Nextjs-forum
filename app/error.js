"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h4>Error!!</h4>
      <div>{error}</div>
      <button
        onClick={() => {
          reset();
        }}
      >
        Retry
      </button>
    </div>
  );
}
