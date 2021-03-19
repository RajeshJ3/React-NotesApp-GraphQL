function Center(props) {
  return (
    <div
      style={{
        height: props.height ? props.height : "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: props.top ? props.top : "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default Center;
